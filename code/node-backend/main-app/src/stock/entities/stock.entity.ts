import { Types, Document, Schema, model } from "mongoose";
import {
  HistoricalValue,
  HistoricalValueSchema,
} from "./historicalValue.entity";

export class Stock extends Document {
  public id: Types.ObjectId;
  public code: string;
  public name: string;
  public description: string;
  public unitValue: number;
  public historicalValues: HistoricalValue[];
  public gameId: string;
  public availableStocksOnMarket: number;
  public totalStocksOnMarket: number;
  public hasTransactions: boolean;

  constructor(
    code: string,
    name: string,
    description: string,
    unitValue: number,
    gameId: string,
    historicalValues: HistoricalValue[],
    availableStocksOnMarket: number,
    totalStocksOnMarket: number,
    hasTransactions: boolean
  ) {
    super();
    this.code = code;
    this.name = name;
    this.description = description;
    this.unitValue = unitValue;
    this.gameId = gameId;
    this.historicalValues = historicalValues;
    this.availableStocksOnMarket = availableStocksOnMarket;
    this.totalStocksOnMarket = totalStocksOnMarket;
    this.hasTransactions = hasTransactions;
  }

  static create(
    code: string,
    name: string,
    description: string,
    unitValue: number,
    gameId: string,
    historicalValues: HistoricalValue[],
    availableStocksOnMarket: number,
    totalStocksOnMarket: number,
    hasTransactions: boolean
  ): Stock {
    return {
      code: code,
      name: name,
      description: description,
      unitValue: unitValue,
      gameId: gameId,
      historicalValues: historicalValues,
      availableStocksOnMarket: availableStocksOnMarket,
      totalStocksOnMarket: totalStocksOnMarket,
      hasTransactions: hasTransactions,
    } as Stock;
  }
}

const stockCodeValidator = (code: string): boolean => {
  return /^[A-Z]{1,6}$/.test(code);
};

export const StockSchema = new Schema<Stock>({
  code: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: stockCodeValidator,
      message: "Code must have 6 or fewer uppercase letters.",
    },
  },
  name: { type: String, required: true },
  description: { type: String },
  unitValue: { type: Number, required: true },
  historicalValues: { type: [HistoricalValueSchema], required: true },
  gameId: { type: String, required: true },
  availableStocksOnMarket: { type: Number, required: true },
  totalStocksOnMarket: { type: Number, required: true },
  hasTransactions: { type: Boolean, required: true, default: false },
});

export const StockModel = model<Stock>("Stock", StockSchema);
