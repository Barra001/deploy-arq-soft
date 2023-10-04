"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const auth_payload_1 = require("./../../auth/entities/auth.payload");
const userInformation_entity_1 = require("../entities/userInformation.entity");
const filters_entity_1 = require("../entities/filters.entity");
class TransactionsController {
    constructor(transactionService, authService) {
        this.transactionService = transactionService;
        this.authService = authService;
    }
    async buy(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.PLAYER,
        ]);
        const gameId = payload.gameId;
        const playerId = payload.userId;
        const data = Object.assign(Object.assign({}, req.body), { gameId: gameId, playerId: playerId });
        const transaction = await this.transactionService.buy(data);
        res.send(transaction);
    }
    async sell(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.PLAYER,
        ]);
        const gameId = payload.gameId;
        const playerId = payload.userId;
        const data = Object.assign(Object.assign({}, req.body), { gameId: gameId, playerId: playerId });
        const transaction = await this.transactionService.sell(data);
        res.send(transaction);
    }
    async get(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.PLAYER,
            auth_payload_1.Role.ADMIN,
        ]);
        const userInfo = new userInformation_entity_1.UserInformation(payload.gameId, payload.userId, payload.role);
        const filters = new filters_entity_1.Filters(req.query.startDate, req.query.endDate, req.query.stockCode, req.query.skip, req.query.limit);
        const transactions = await this.transactionService.get(userInfo, filters);
        res.send(transactions);
    }
    async getVolume(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.PLAYER,
            auth_payload_1.Role.ADMIN,
        ]);
        const gameId = payload.gameId;
        const stockCode = req.params.stockCode;
        const volume = await this.transactionService.calculateVolume(stockCode, gameId);
        res.send(volume.toString());
    }
}
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map