import { AuthPayload, Role } from "./../entities/auth.payload";
import {
  InvalidTokenException,
  NoTokenPresentException,
  NotEnoughPrivilegesException,
  UndefinedUserException,
  UserNotExistsException,
} from "./../auth.exceptions";
import { sign, verify } from "jsonwebtoken";
import { readFileSync } from "fs";
import { Request } from "express";
import { AuthServiceInterface } from "./auth.service.interface";
import { User } from "./../entities/auth.entity";
import { EncryptionServiceInterface } from "../../encryption/service/encryption.interface";
import { PlayersRepositoryInterface } from "src/player/repository/players.repository.interface";
import { NotFoundException } from "./../../database/entity.repository";
import { GamesRepositoryInterface } from "./../../game/repository/games.repository.interface";
import { AdminsRepositoryInterface } from "./../../admins/repository/admins.repository.interface";
import { PlataformActivitiesServiceInterface } from "./../../plataform_activity/service/plataform_activities.service.interface";
import { LogType } from "./../../plataform_activity/entities/log-event";

const privateKey = readFileSync("./private.key");
const publicKey = readFileSync("./public.key");

export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly gamesRepository: GamesRepositoryInterface,
    private readonly playersRepository: PlayersRepositoryInterface,
    private readonly adminsRepository: AdminsRepositoryInterface,
    private readonly encryptionService: EncryptionServiceInterface,
    private readonly platformActivityService: PlataformActivitiesServiceInterface
  ) {}

  private static tokenOptions = { expiresIn: "1h", algorithm: "RS256" };

  private async generateToken(payload: AuthPayload): Promise<string> {
    const token = await sign(payload, privateKey, AuthService.tokenOptions);
    return token;
  }

  async logInPlayer(user: User): Promise<string> {
    if (!user) {
      throw new UndefinedUserException();
    }
    const game = await this.gamesRepository.find({ name: user.gameName });

    let userInDb;
    try {
      userInDb = await this.playersRepository.find({
        email: user.email,
        gameId: game.id,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        await this.platformActivityService.create(
          "Player tied to log with invalid credentials",
          user.email,
          LogType.info
        );
        throw new UserNotExistsException();
      }
      throw error;
    }

    await this.validatePassword(user.password, userInDb.password);

    const payload: AuthPayload = {
      username: user.email,
      userId: userInDb.id,
      gameId: userInDb.gameId,
      role: Role.PLAYER,
    };
    const token = await this.generateToken(payload);

    await this.platformActivityService.create(
      "Player logged in",
      "Player",
      LogType.info
    );

    return token;
  }

  async logInAdmin(user: User): Promise<string> {
    if (!user) {
      throw new UndefinedUserException();
    }

    let userInDb;
    try {
      userInDb = await this.adminsRepository.find({ email: user.email });
    } catch (error) {
      if (error instanceof NotFoundException)
        await this.platformActivityService.create(
          "Admin tied to log with invalid credentials",
          user.email,
          LogType.info
        );
      throw new UserNotExistsException();

      throw error;
    }

    await this.validatePassword(user.password, userInDb.password);

    const payload: AuthPayload = {
      username: user.email,
      userId: userInDb.id,
      gameId: userInDb.gameId || null,
      role: Role.ADMIN,
    };
    const token = await this.generateToken(payload);

    return token;
  }

  async verifyRequestForRoles(
    req: Request,
    rolesPermitted: Role[]
  ): Promise<AuthPayload> {
    const authorization = req.header("Authorization");
    const token = authorization ? authorization.replace("Bearer ", "") : null;
    if (!token) {
      this.platformActivityService.create(
        "Someone tried to access a protected route without a token",
        "Anonymous",
        LogType.warn
      );
      throw new NoTokenPresentException();
    }
    let payload: AuthPayload;
    try {
      payload = await verify(token, publicKey);
    } catch (error) {
      this.platformActivityService.create(
        "Someone tried to access a protected route with an invalid token",
        "Anonymous",
        LogType.warn
      );
      throw new InvalidTokenException();
    }
    if (!rolesPermitted.includes(payload.role)) {
      this.platformActivityService.create(
        "Someone tried to access a protected route with not enough privileges",
        payload.role,
        LogType.warn
      );
      throw new NotEnoughPrivilegesException();
    }
    return payload;
  }

  private async validatePassword(
    password: string,
    passwordInDb: string
  ): Promise<void> {
    const passwordIsValid = await this.encryptionService.comparePassowrd(
      password,
      passwordInDb
    );
    if (!passwordIsValid) {
      throw new UserNotExistsException();
    }
  }
}
