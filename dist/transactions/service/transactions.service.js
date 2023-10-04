"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const transactions_exceptions_1 = require("../transactions.exceptions");
const shareInteraction_entity_1 = require("../entities/shareInteraction.entity");
const log_event_1 = require("./../../plataform_activity/entities/log-event");
class TransactionService {
    constructor(transactionRepository, stocksService, playersService, platformActivitiesService) {
        this.transactionRepository = transactionRepository;
        this.stocksService = stocksService;
        this.playersService = playersService;
        this.platformActivitiesService = platformActivitiesService;
    }
    async get(userInfo, filters) {
        if (userInfo.role === "player") {
            filters.playerId = userInfo.playerId;
        }
        if (filters.startDate || filters.endDate) {
            filters.date = Object.assign(Object.assign({}, (filters.startDate && { $gte: filters.startDate })), (filters.endDate && { $lte: filters.endDate }));
        }
        const validFilters = filters.getValidFilters();
        const { startDate, endDate, skip, limit } = validFilters, remainingFilters = __rest(validFilters, ["startDate", "endDate", "skip", "limit"]);
        remainingFilters.gameId = userInfo.gameId;
        const transactions = await this.transactionRepository.findAll(remainingFilters, skip, limit);
        return transactions;
    }
    async calculateVolume(stockCode, gameId) {
        const transactions = await this.transactionRepository.findAll({
            stockCode: stockCode,
            gameId: gameId,
        });
        const volume = transactions.reduce((acc, curr) => {
            return acc + curr.quantity;
        }, 0);
        return volume;
    }
    async buy(transaction) {
        const player = await this.playersService.find({
            _id: transaction.playerId,
        });
        const stock = await this.validateExistentStock(transaction.stockCode, transaction.gameId);
        transaction.stockValueOnTransaction = stock.unitValue;
        transaction.type = shareInteraction_entity_1.ShareInteraction.Purchase;
        await this.validatePlayerBalance(transaction, player);
        await this.validateStockSharesQuanitity(stock, transaction.quantity);
        transaction.date = new Date();
        const confirmedTransaction = await this.transactionRepository.create(transaction);
        await this.updatePlayerBalance(confirmedTransaction, player);
        await this.playersService.addStockToPortfolio(confirmedTransaction);
        stock.availableStocksOnMarket -= transaction.quantity;
        stock.hasTransactions = true;
        await stock.save();
        await this.platformActivitiesService.create("Stock purchased", `Player - ${stock.code}`, log_event_1.LogType.info);
        return confirmedTransaction;
    }
    async sell(transaction) {
        const player = await this.playersService.find({
            _id: transaction.playerId,
        });
        const stock = await this.validateExistentStock(transaction.stockCode, transaction.gameId);
        const hasStock = await this.playersService.validatePlayerHasStock(transaction.playerId, transaction.stockCode, transaction.quantity);
        if (!hasStock)
            throw new transactions_exceptions_1.InsufficientStockToSellException();
        transaction.stockValueOnTransaction = stock.unitValue;
        transaction.type = shareInteraction_entity_1.ShareInteraction.Sell;
        transaction.date = new Date();
        const confirmedTransaction = await this.transactionRepository.create(transaction);
        await this.updatePlayerBalance(confirmedTransaction, player);
        await this.playersService.addStockToPortfolio(transaction);
        await this.platformActivitiesService.create("Stock sold", `Player - ${stock.code}`, log_event_1.LogType.info);
        stock.availableStocksOnMarket += transaction.quantity;
        stock.hasTransactions = true;
        await stock.save();
        return confirmedTransaction;
    }
    async findAll(filters) {
        return await this.transactionRepository.findAll(filters);
    }
    validatePlayerBalance(transaction, player) {
        const transactionValue = transaction.stockValueOnTransaction * transaction.quantity;
        if (transactionValue > player.balance)
            throw new transactions_exceptions_1.UnsufficientFundsException();
    }
    validateStockSharesQuanitity(stock, quantity) {
        if (stock.availableStocksOnMarket < quantity)
            throw new transactions_exceptions_1.InsufficientSharesToBuyException();
    }
    async validateExistentStock(stockCode, gameId) {
        try {
            const stock = await this.stocksService.find({
                code: stockCode,
                gameId: gameId,
            });
            return stock;
        }
        catch (error) {
            throw new transactions_exceptions_1.InvalidStockCodeException();
        }
    }
    async updatePlayerBalance(transaction, player) {
        const transactionValue = transaction.stockValueOnTransaction * transaction.quantity;
        if (transaction.type === shareInteraction_entity_1.ShareInteraction.Purchase)
            player.balance -= transactionValue;
        else
            player.balance += transactionValue;
        await this.playersService.update(player);
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transactions.service.js.map