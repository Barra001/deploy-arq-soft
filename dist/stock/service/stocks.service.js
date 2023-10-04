"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksService = void 0;
const stock_exceptions_1 = require("../stock.exceptions");
class StocksService {
    constructor(stocksRepository) {
        this.stocksRepository = stocksRepository;
    }
    async create(stock) {
        const stockAlreadyExists = await this.stocksRepository.exists({
            code: stock.code,
            gameId: stock.gameId,
        });
        if (stockAlreadyExists) {
            throw new stock_exceptions_1.StockAlreadyExistsException();
        }
        this.validateValue(stock.unitValue);
        this.validateValue(stock.totalStocksOnMarket);
        stock.availableStocksOnMarket = stock.totalStocksOnMarket;
        const newHistoricalValue = {
            date: new Date(),
            value: stock.unitValue,
        };
        stock.historicalValues = [newHistoricalValue, ...stock.historicalValues];
        return this.stocksRepository.create(Object.assign({}, stock));
    }
    async delete(id, gameId) {
        const stock = await this.stocksRepository.find({ _id: id });
        if (stock.gameId !== gameId) {
            throw new stock_exceptions_1.UnauthorizedModificationOfStock();
        }
        if (stock.hasTransactions) {
            throw new stock_exceptions_1.StockHasActiveTransactionsException();
        }
        await this.stocksRepository.delete(id);
        return "Stock deleted successfully";
    }
    async find(filters = {}) {
        return this.stocksRepository.find(filters);
    }
    async findAll(filters) {
        const { skip, limit, gameId } = filters;
        const adaptedFilters = {
            gameId: gameId,
        };
        filters.query &&
            (adaptedFilters.$or = [
                { name: { $regex: filters.query, $options: "i" } },
                { description: { $regex: filters.query, $options: "i" } },
            ]);
        return this.stocksRepository.findAll(adaptedFilters, skip, limit);
    }
    async modify(id, stock) {
        const stockToUpdate = await this.stocksRepository.find({ _id: id });
        if (stockToUpdate.gameId !== stock.gameId) {
            throw new stock_exceptions_1.UnauthorizedModificationOfStock();
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
    validateValue(price) {
        if (price <= 0)
            throw new stock_exceptions_1.StockInvalidPrice();
    }
}
exports.StocksService = StocksService;
//# sourceMappingURL=stocks.service.js.map