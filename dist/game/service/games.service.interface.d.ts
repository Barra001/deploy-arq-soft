import { Game } from "../entities/game.entity";
export interface GamesServiceInterface {
    create(game: Game, creator: string, adminId: string): Promise<Game>;
    getAll(): Promise<Game[]>;
    findById(id: string): Promise<Game>;
}
