import { PlayersRepositoryInterface } from "src/player/repository/players.repository.interface";
import { EncryptionServiceInterface } from "../encryption/service/encryption.interface";
import { GamesRepositoryInterface } from "src/game/repository/games.repository.interface";
import { AuthService } from "./service/auth.service";
import { AuthServiceInterface } from "./service/auth.service.interface";
import { AdminsRepositoryInterface } from "src/admins/repository/admins.repository.interface";
import { PlataformActivitiesServiceInterface } from "./../plataform_activity/service/plataform_activities.service.interface";

export class AuthFactory {
  static create(
    encryptionService: EncryptionServiceInterface,
    playersRepository: PlayersRepositoryInterface,
    adminsRepository: AdminsRepositoryInterface,
    gamesRepository: GamesRepositoryInterface,
    plataformActivitiesServiceInterface: PlataformActivitiesServiceInterface
  ): AuthServiceInterface {
    const authService = new AuthService(
      gamesRepository,
      playersRepository,
      adminsRepository,
      encryptionService,
      plataformActivitiesServiceInterface
    );
    return authService;
  }
}
