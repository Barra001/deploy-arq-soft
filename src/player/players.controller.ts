import { Request, Response } from "express";
import { PlayersServiceInterface } from "./service/players.service.interface";
import { Role } from "../auth/entities/auth.payload";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
import { User } from "src/auth/entities/auth.entity";
import { Player } from "./entities/players.entity";

export class PlayersController {
  constructor(
    private readonly playersService: PlayersServiceInterface,
    private readonly authService: AuthServiceInterface
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    const data: Player = req.body;
    const gameCode = req.query.gameCode;
    const player = await this.playersService.create(data, gameCode);
    res.send(player);
  }

  async logIn(req: Request, res: Response): Promise<void> {
    const user: User = req.body;
    const token = await this.authService.logInPlayer(user);
    res.setHeader("Authorization", token);
    res.json({ message: "Login Successful" });
  }

  async getPlayer(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.PLAYER,
    ]);
    const player = await this.playersService.getPlayer(payload.userId);
    res.send(player);
  }
}
