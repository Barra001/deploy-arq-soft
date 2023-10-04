import { Model } from "mongoose";
import { EntityRepository } from "../../database/entity.repository";
import { PlayersRepositoryInterface } from "./players.repository.interface";
import { Player } from "src/player/entities/players.entity";

export class PlayersRepository extends EntityRepository<Player> implements PlayersRepositoryInterface
{
  constructor(playerModel: Model<Player>) {
    super(playerModel);
  }
}
