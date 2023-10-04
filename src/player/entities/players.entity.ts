import { Types, Document, Schema, model } from "mongoose";
import {
  StockQuantity,
  StockQuantitySchema,
} from "./../../stock/entities/stockQuantity";

export class Player extends Document {
  public id: Types.ObjectId;
  public name: string;
  public password: string;
  public email: string;
  public gameId: string;
  public balance: number;
  public portfolio: StockQuantity[];

  constructor(
    userName: string,
    password: string,
    email: string,
    gameId: string,
    balance: number
  ) {
    super();
    this.name = userName;
    this.password = password;
    this.email = email;
    this.gameId = gameId;
    this.balance = balance;
    this.portfolio = [];
  }
}

export const PlayerSchema = new Schema<Player>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  gameId: { type: String, required: true },
  balance: { type: Number, required: true, default: 1000 },
  portfolio: { type: [StockQuantitySchema], required: true },
});

export const PlayerModel = model<Player>("Player", PlayerSchema);
