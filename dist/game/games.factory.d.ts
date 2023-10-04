import { GamesRepositoryInterface } from "./repository/games.repository.interface";
import { GamesServiceInterface } from "./service/games.service.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
import { AdminsServiceInterface } from "src/admins/service/admins.service.interface";
export declare class GamesFactory {
    static create(plataformActivityService: PlataformActivitiesServiceInterface, gameRepository: GamesRepositoryInterface, adminService: AdminsServiceInterface): GamesServiceInterface;
}
