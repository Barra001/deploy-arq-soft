import { GamesRepositoryInterface } from "src/game/repository/games.repository.interface";
import { PlayersRepositoryInterface } from "./repository/players.repository.interface";
import { PlayersServiceInterface } from "./service/players.service.interface";
import { EncryptionServiceInterface } from "src/encryption/service/encryption.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
export declare class PlayersFactory {
    static create(encryptionService: EncryptionServiceInterface, plataformActivityService: PlataformActivitiesServiceInterface, gameRepository: GamesRepositoryInterface, playersRepository: PlayersRepositoryInterface): PlayersServiceInterface;
}
