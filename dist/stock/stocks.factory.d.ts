import { StocksRepository } from "./repository/stocks.repository";
import { StocksServiceInterface } from "./service/stocks.service.interface";
export declare class StocksFactory {
    static create(stocksRepository: StocksRepository): StocksServiceInterface;
}
