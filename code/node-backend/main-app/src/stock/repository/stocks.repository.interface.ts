import { AnyKeys, AnyObject } from "mongoose";
import { Stock } from "../entities/stock.entity";

export interface StocksRepositoryInterface {
  create(data: AnyKeys<Stock> & AnyObject): Promise<Stock>;
  exists(filters): Promise<boolean>;
  findAll(filters, skip: number, limit: number): Promise<Stock[]>;
  delete(id: string): Promise<void>;
  find(filters): Promise<Stock>;
  save(stock: Stock): Promise<Stock>;
}
