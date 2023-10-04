"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsFactory = void 0;
const transactions_service_1 = require("./service/transactions.service");
class TransactionsFactory {
    static create(transactionsRepository, stocksService, playersService, plataformActivitiesService) {
        const transactionsService = new transactions_service_1.TransactionService(transactionsRepository, stocksService, playersService, plataformActivitiesService);
        return transactionsService;
    }
}
exports.TransactionsFactory = TransactionsFactory;
//# sourceMappingURL=transactions.factory.js.map