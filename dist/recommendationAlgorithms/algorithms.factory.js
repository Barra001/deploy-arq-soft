"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorithmsFactory = void 0;
const algorithms_service_1 = require("./services/algorithms.service");
class AlgorithmsFactory {
    static create(stocksService, transactionsService, PlataformActivitiesService, gameService, redisClient) {
        const algorithmsService = new algorithms_service_1.AlgorithmsServices(stocksService, transactionsService, PlataformActivitiesService, gameService, redisClient);
        return algorithmsService;
    }
}
exports.AlgorithmsFactory = AlgorithmsFactory;
//# sourceMappingURL=algorithms.factory.js.map