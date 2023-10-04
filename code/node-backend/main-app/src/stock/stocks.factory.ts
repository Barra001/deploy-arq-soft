import { StocksRepository } from "./repository/stocks.repository";
import { StocksService } from "./service/stocks.service";
import { StocksServiceInterface } from "./service/stocks.service.interface";

export class StocksFactory {
  static create(stocksRepository: StocksRepository): StocksServiceInterface {
    const stocksService = new StocksService(stocksRepository);
    return stocksService;
  }
}
