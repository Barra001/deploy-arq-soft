import { Types, Document, Schema, model } from "mongoose";

export enum AlgorithmType {
  TransactionBehaviour = "transactionBehaviour",
  PriceEvolution = "priceEvolution",
}

export class Game extends Document {
  public id: Types.ObjectId;
  public name: string;
  public startDate: Date;
  public endDate: Date;
  public codesToUse: string[];
  public algorithmType: AlgorithmType;
  constructor(name: string) {
    super();
    this.name = name;
    this.codesToUse = [];
  }

  public static create(
    name: string,
    startDate: Date,
    endDate: Date,
    codesToUse: string[],
    algorithmType: AlgorithmType
  ): Game {
    return {
      name: name,
      startDate: startDate,
      endDate: endDate,
      codesToUse: codesToUse,
      algorithmType: algorithmType,
    } as Game;
  }
}

export const GameSchema = new Schema<Game>({
  name: { type: String, required: true },
  codesToUse: { type: [String], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  algorithmType: {
    type: String,
    enum: ["transactionBehaviour", "priceEvolution"],
    required: true,
  },
});

export const GameModel = model<Game>("Game", GameSchema);
