
import { GamesRepositoryInterface } from "./repository/games.repository.interface";
import { GamesService } from "./service/games.service";
import { GamesServiceInterface } from "./service/games.service.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
import { AdminsServiceInterface } from "src/admins/service/admins.service.interface";

export class GamesFactory {
    static create(
        plataformActivityService: PlataformActivitiesServiceInterface,
        gameRepository: GamesRepositoryInterface,
        adminService: AdminsServiceInterface
    ): GamesServiceInterface {
        const gameService = new GamesService(
            gameRepository,
            plataformActivityService,
            adminService
        );
        return gameService;
    }
}
