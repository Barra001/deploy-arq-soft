"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksFactory = void 0;
const stocks_service_1 = require("./service/stocks.service");
class StocksFactory {
    static create(stocksRepository) {
        const stocksService = new stocks_service_1.StocksService(stocksRepository);
        return stocksService;
    }
}
exports.StocksFactory = StocksFactory;
//# sourceMappingURL=stocks.factory.js.map