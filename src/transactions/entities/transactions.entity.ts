import { Types, Document, Schema, model } from "mongoose";
import { ShareInteraction } from "./shareInteraction.entity";

export class Transaction extends Document {
  public id: Types.ObjectId;
  public stockCode: string;
  public quantity: number;
  public playerId: string;
  public gameId: string;
  public date: Date;
  public type: ShareInteraction;
  public stockValueOnTransaction: number;

  constructor(
    stockCode: string,
    stockQuanity: number,
    playerId: string,
    gameId: string,
    type: ShareInteraction,
    date: Date,
    stockValueOnTransaction: number
  ) {
    super();
    this.stockCode = stockCode;
    this.quantity = stockQuanity;
    this.playerId = playerId;
    this.gameId = gameId;
    this.type = type;
    this.date = date;
    this.stockValueOnTransaction = stockValueOnTransaction;
  }
}

export const TransactionSchema = new Schema<Transaction>({
  stockCode: { type: String, required: true },
  quantity: { type: Number, required: true },
  stockValueOnTransaction: { type: Number, required: true },
  playerId: { type: String, required: true },
  gameId: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
});

export const TransactionModel = model<Transaction>("Transaction", TransactionSchema);
