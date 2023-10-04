import { Schema, model } from "mongoose";

export class StockQuantity {
  public stockCode: string;
  public quantity: number;

  constructor(stockCode: string, quantity: number) {
    this.stockCode = stockCode;
    this.quantity = quantity;
  }
}

export const StockQuantitySchema = new Schema<StockQuantity>({
  stockCode: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export const StockQuantityModel = model<StockQuantity>(
  "StockQuantity",
  StockQuantitySchema
);
