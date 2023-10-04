import { AuthPayload, Role } from "./../entities/auth.payload";
import { Request } from "express";
import { AuthServiceInterface } from "./auth.service.interface";
import { User } from "./../entities/auth.entity";
import { EncryptionServiceInterface } from "../../encryption/service/encryption.interface";
import { PlayersRepositoryInterface } from "src/player/repository/players.repository.interface";
import { GamesRepositoryInterface } from "./../../game/repository/games.repository.interface";
import { AdminsRepositoryInterface } from "./../../admins/repository/admins.repository.interface";
import { PlataformActivitiesServiceInterface } from "./../../plataform_activity/service/plataform_activities.service.interface";
export declare class AuthService implements AuthServiceInterface {
    private readonly gamesRepository;
    private readonly playersRepository;
    private readonly adminsRepository;
    private readonly encryptionService;
    private readonly platformActivityService;
    constructor(gamesRepository: GamesRepositoryInterface, playersRepository: PlayersRepositoryInterface, adminsRepository: AdminsRepositoryInterface, encryptionService: EncryptionServiceInterface, platformActivityService: PlataformActivitiesServiceInterface);
    private static tokenOptions;
    private generateToken;
    logInPlayer(user: User): Promise<string>;
    logInAdmin(user: User): Promise<string>;
    verifyRequestForRoles(req: Request, rolesPermitted: Role[]): Promise<AuthPayload>;
    private validatePassword;
}
