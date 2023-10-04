import { Model } from "mongoose";
import { EntityRepository } from "../../database/entity.repository";
import { Game } from "../entities/game.entity";
import { GamesRepositoryInterface } from "./games.repository.interface";

export class GamesRepository
  extends EntityRepository<Game>
  implements GamesRepositoryInterface {
  constructor(gameModel: Model<Game>) {
    super(gameModel);
  }
  async getGameByCode(code: string): Promise<Game> {
    return await this.find({ codesToUse: { $in: [code] } });
  }
  async removeGameCode(game: Game, code: string): Promise<Game> {
    game.codesToUse = game.codesToUse.filter((c) => c !== code);
    return await this.update(game);
  }
}
