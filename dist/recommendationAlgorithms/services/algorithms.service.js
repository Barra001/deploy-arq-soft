"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorithmsServices = void 0;
const shareInteraction_entity_1 = require("../../transactions/entities/shareInteraction.entity");
const log_event_1 = require("./../../plataform_activity/entities/log-event");
const game_entity_1 = require("./../../game/entities/game.entity");
class AlgorithmsServices {
    constructor(stocksService, transactionsService, platformActivityService, gamesServicee, redisClient) {
        this.stocksService = stocksService;
        this.transactionsService = transactionsService;
        this.platformActivityService = platformActivityService;
        this.gamesServicee = gamesServicee;
        this.redisClient = redisClient;
    }
    async getDecision(stockCode, gameId) {
        const game = (await this.gamesServicee.findById(gameId));
        switch (game.algorithmType) {
            case game_entity_1.AlgorithmType.PriceEvolution:
                return await this.priceEvolutionAlgorithm(stockCode, gameId);
            case game_entity_1.AlgorithmType.TransactionBehaviour:
                return await this.transactionBehaviourAlgorithm(stockCode, gameId);
            default:
                await this.platformActivityService.create("Algorithm not found", "Admin", log_event_1.LogType.error);
                return "Algorithm not found";
        }
    }
    async priceEvolutionAlgorithm(stockCode, gameId) {
        const cachedDecision = await this.redisClient.getDecisionFromRedis(`${stockCode}-${gameId}priceEvolution`);
        if (cachedDecision)
            return cachedDecision;
        const stock = await this.stocksService.find({
            code: stockCode,
            gameId: gameId,
        });
        const averageValue = this.calculateAverageValue(stock.historicalValues);
        const decision = stock.unitValue >= averageValue ? "sell" : "buy";
        await this.redisClient.storeDecisionInRedis(`${stock.code}-${gameId}priceEvolution`, decision);
        return decision;
    }
    async transactionBehaviourAlgorithm(stockCode, gameId) {
        const transactions = await this.transactionsService.findAll({
            stockCode: stockCode,
            gameId: gameId,
            limit: 100,
        });
        if (transactions.length <= 5)
            return "Wait";
        const cachedDecision = await this.redisClient.getDecisionFromRedis(`${stockCode}-${gameId}transactionBehaviour`);
        if (cachedDecision)
            return cachedDecision;
        const buyTransactions = transactions.filter((transaction) => transaction.type === shareInteraction_entity_1.ShareInteraction.Purchase).length;
        const sellTransactions = transactions.length - buyTransactions;
        const buyPercentage = (buyTransactions / transactions.length) * 100;
        const sellPercentage = (sellTransactions / transactions.length) * 100;
        let result = "Wait";
        if (buyPercentage >= 70)
            result = "Buy";
        if (sellPercentage >= 70)
            result = "Sell";
        await this.redisClient.storeDecisionInRedis(`${stockCode}-${gameId}transactionBehaviour`, result);
        return result;
    }
    calculateAverageValue(historicalValues) {
        return (historicalValues.reduce((a, b) => a + b.value, 0) /
            historicalValues.length);
    }
}
exports.AlgorithmsServices = AlgorithmsServices;
//# sourceMappingURL=algorithms.service.js.map