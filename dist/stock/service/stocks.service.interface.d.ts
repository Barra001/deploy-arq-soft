import { Stock } from "../entities/stock.entity";
export interface StocksServiceInterface {
    create(stock: Stock): Promise<Stock>;
    delete(id: string, gameId: string): Promise<string>;
    modify(id: string, stock: Stock): Promise<Stock>;
    find(filters: any): Promise<Stock>;
    findAll(filters: any): Promise<Stock[]>;
}
