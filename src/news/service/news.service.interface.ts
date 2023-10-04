import { News } from "../entities/news.entity";

export interface NewsServiceInterface {
  create(news: News, creator: string): Promise<News>;
  delete(news: News, creator: string): Promise<string>;
  getFromStockCode(code: string, gameId: string): Promise<News[]>;
}
