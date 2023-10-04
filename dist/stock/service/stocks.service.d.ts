import { Stock } from "../entities/stock.entity";
import { StocksRepositoryInterface } from "../repository/stocks.repository.interface";
import { StocksServiceInterface } from "./stocks.service.interface";
export declare class StocksService implements StocksServiceInterface {
    private readonly stocksRepository;
    constructor(stocksRepository: StocksRepositoryInterface);
    create(stock: Stock): Promise<Stock>;
    delete(id: string, gameId: string): Promise<string>;
    find(filters?: {}): Promise<Stock>;
    findAll(filters: {
        gameId: string;
        query: string;
        skip: number;
        limit: number;
    }): Promise<Stock[]>;
    modify(id: string, stock: Stock): Promise<Stock>;
    private validateValue;
}
