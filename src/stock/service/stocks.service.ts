import { Stock } from "../entities/stock.entity";
import { StocksRepositoryInterface } from "../repository/stocks.repository.interface";
import { StocksServiceInterface } from "./stocks.service.interface";
import {
  UnauthorizedModificationOfStock,
  StockHasActiveTransactionsException,
  StockAlreadyExistsException,
  StockInvalidPrice,
} from "../stock.exceptions";

export class StocksService implements StocksServiceInterface {
  constructor(private readonly stocksRepository: StocksRepositoryInterface) {}

  async create(stock: Stock): Promise<Stock> {
    const stockAlreadyExists = await this.stocksRepository.exists({
      code: stock.code,
      gameId: stock.gameId,
    });

    if (stockAlreadyExists) {
      throw new StockAlreadyExistsException();
    }
    this.validateValue(stock.unitValue);
    this.validateValue(stock.totalStocksOnMarket);
    stock.availableStocksOnMarket = stock.totalStocksOnMarket;
    const newHistoricalValue = {
      date: new Date(),
      value: stock.unitValue,
    };
    stock.historicalValues = [newHistoricalValue, ...stock.historicalValues];
    return this.stocksRepository.create({ ...stock });
  }

  async delete(id: string, gameId: string): Promise<string> {
    const stock = await this.stocksRepository.find({ _id: id });
    if (stock.gameId !== gameId) {
      throw new UnauthorizedModificationOfStock();
    }
    if (stock.hasTransactions) {
      throw new StockHasActiveTransactionsException();
    }
    await this.stocksRepository.delete(id);
    return "Stock deleted successfully";
  }

  async find(filters = {}): Promise<Stock> {
    return this.stocksRepository.find(filters);
  }

  async findAll(filters: {
    gameId: string;
    query: string;
    skip: number;
    limit: number;
  }): Promise<Stock[]> {
    const { skip, limit, gameId } = filters;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adaptedFilters: any = {
      gameId: gameId,
    };

    filters.query &&
      (adaptedFilters.$or = [
        { name: { $regex: filters.query, $options: "i" } },
        { description: { $regex: filters.query, $options: "i" } },
      ]);
    return this.stocksRepository.findAll(adaptedFilters, skip, limit);
  }

  async modify(id: string, stock: Stock): Promise<Stock> {
    const stockToUpdate = await this.stocksRepository.find({ _id: id });
    if (stockToUpdate.gameId !== stock.gameId) {
      throw new UnauthorizedModificationOfStock();
    }

    stockToUpdate.code = stock.code || stockToUpdate.code;
    if (stock.unitValue) {
      this.validateValue(stock.unitValue);
      stockToUpdate.historicalValues.push({
        date: new Date(),
        value: stock.unitValue,
      });
      stockToUpdate.unitValue = stock.unitValue;
    }
    stockToUpdate.description = stock.description || stockToUpdate.description;
    stockToUpdate.name = stock.name || stockToUpdate.name;
    stockToUpdate.totalStocksOnMarket =
      stock.totalStocksOnMarket || stockToUpdate.totalStocksOnMarket;
    stockToUpdate.availableStocksOnMarket =
      stock.availableStocksOnMarket || stockToUpdate.availableStocksOnMarket;
    if (!stockToUpdate.hasTransactions) {
      stockToUpdate.hasTransactions =
        stock.hasTransactions || stockToUpdate.hasTransactions;
    }

    await stockToUpdate.save();
    return stockToUpdate;
  }

  private validateValue(price: number): void {
    if (price <= 0) throw new StockInvalidPrice();
  }
}
