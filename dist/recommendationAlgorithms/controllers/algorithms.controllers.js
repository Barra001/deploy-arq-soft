"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorithmsController = void 0;
const auth_payload_1 = require("./../../auth/entities/auth.payload");
class AlgorithmsController {
    constructor(algorithmsService, authService) {
        this.algorithmsService = algorithmsService;
        this.authService = authService;
    }
    async algorithmPrediction(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.PLAYER,
        ]);
        const gameId = payload.gameId;
        const stockCode = req.params.stockCode;
        const recommendation = await this.algorithmsService.getDecision(stockCode, gameId);
        res.send(recommendation);
    }
}
exports.AlgorithmsController = AlgorithmsController;
//# sourceMappingURL=algorithms.controllers.js.map