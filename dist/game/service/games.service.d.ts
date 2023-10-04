import { Game } from "../entities/game.entity";
import { PlataformActivitiesServiceInterface } from "../../plataform_activity/service/plataform_activities.service.interface";
import { GamesRepositoryInterface } from "src/game/repository/games.repository.interface";
import { GamesServiceInterface } from "./games.service.interface";
import { AdminsServiceInterface } from "src/admins/service/admins.service.interface";
export declare class GamesService implements GamesServiceInterface {
    private readonly gamesRepository;
    private readonly plataformActivitiesService;
    private readonly adminService;
    constructor(gamesRepository: GamesRepositoryInterface, plataformActivitiesService: PlataformActivitiesServiceInterface, adminService: AdminsServiceInterface);
    findById(id: string): Promise<Game>;
    create(game: Game, creator: string, adminId: string): Promise<Game>;
    private validateGameDates;
    private validateCodes;
    private gameCodeValidator;
    getAll(): Promise<Game[]>;
}
