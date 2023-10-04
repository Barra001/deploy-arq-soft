"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksController = void 0;
const auth_payload_1 = require("./../auth/entities/auth.payload");
class StocksController {
    constructor(stocksService, authService) {
        this.stocksService = stocksService;
        this.authService = authService;
    }
    async create(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.ADMIN,
            auth_payload_1.Role.PLAYER,
        ]);
        const gameId = payload.gameId;
        const data = Object.assign(Object.assign({}, req.body), { gameId: gameId });
        const stock = await this.stocksService.create(data);
        res.send(stock);
    }
    async getAll(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [auth_payload_1.Role.ADMIN, auth_payload_1.Role.PLAYER]);
        const filters = Object.assign(Object.assign({}, req.query), { gameId: payload.gameId });
        const stocks = await this.stocksService.findAll(filters);
        res.send(stocks);
    }
    async delete(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.ADMIN,
            auth_payload_1.Role.PLAYER,
        ]);
        const gameId = payload.gameId;
        const id = req.params.id;
        const stock = await this.stocksService.delete(id, gameId);
        res.send(stock);
    }
    async modify(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.ADMIN,
            auth_payload_1.Role.PLAYER,
        ]);
        const gameId = payload.gameId;
        const id = req.params.id;
        const data = Object.assign(Object.assign({}, req.body), { gameId: gameId });
        const stock = await this.stocksService.modify(id, data);
        res.send(stock);
    }
}
exports.StocksController = StocksController;
//# sourceMappingURL=stocks.controller.js.map