import { AnyKeys, AnyObject } from "mongoose";
import { News } from "../entities/news.entity";

export interface NewsRepositoryInterface {
  create(data: AnyKeys<News> & AnyObject): Promise<News>;
  getAll(): Promise<News[]>;
  delete(id: string): Promise<void>;
  findAll(filters): Promise<News[]>;
}
