"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesController = void 0;
const auth_payload_1 = require("../auth/entities/auth.payload");
class GamesController {
    constructor(gamesService, authService) {
        this.gamesService = gamesService;
        this.authService = authService;
    }
    async create(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.ADMIN,
        ]);
        const data = req.body;
        const creator = payload.username;
        const game = await this.gamesService.create(data, creator, payload.userId);
        res.send(game);
    }
    async getAll(req, res) {
        const games = await this.gamesService.getAll();
        res.send(games);
    }
}
exports.GamesController = GamesController;
//# sourceMappingURL=games.controller.js.map