import { AnyKeys, AnyObject } from "mongoose";
import { Player } from "../entities/players.entity";
export interface PlayersRepositoryInterface {
    find(filters: any): Promise<Player>;
    create(data: AnyKeys<Player> & AnyObject): Promise<Player>;
    update(player: Player): Promise<Player>;
}
