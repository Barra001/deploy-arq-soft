import { Schema } from "mongoose";

export class HistoricalValue {
  public value: number;
  public date: Date;

  constructor(value: number, date: Date) {
    this.value = value;
    this.date = date;
  }
}

export const HistoricalValueSchema = new Schema<HistoricalValue>({
  value: { type: Number, required: true },
  date: { type: Date, required: true },
});
