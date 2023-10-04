import { AnyKeys, AnyObject } from "mongoose";
import { Game } from "../entities/game.entity";

export interface GamesRepositoryInterface {
  create(data: AnyKeys<Game> & AnyObject): Promise<Game>;
  getAll(): Promise<Game[]>;
  getGameByCode(code: string): Promise<Game>;
  removeGameCode(game: Game, code: string): Promise<Game>;
  find(filters): Promise<Game>;
  findById(id: string): Promise<Game>;
}
