import { Model } from "mongoose";
import { EntityRepository } from "../../database/entity.repository";
import { Game } from "../entities/game.entity";
import { GamesRepositoryInterface } from "./games.repository.interface";
export declare class GamesRepository extends EntityRepository<Game> implements GamesRepositoryInterface {
    constructor(gameModel: Model<Game>);
    getGameByCode(code: string): Promise<Game>;
    removeGameCode(game: Game, code: string): Promise<Game>;
}
