import { Player } from "../entities/players.entity";
import { Transaction } from "../../transactions/entities/transactions.entity";

export interface PlayersServiceInterface {
  getPlayer(userId: string): Promise<Player>;
  create(player: Player, gameCode: string): Promise<Player>;
  find(filters): Promise<Player>;
  update(player: Player): Promise<Player>;
  addStockToPortfolio(transaction: Transaction): Promise<void>;
  validatePlayerHasStock(
    playerId: string,
    stockCode: string,
    quantity: number
  ): Promise<boolean>;
}
