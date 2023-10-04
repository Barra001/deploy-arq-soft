"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesFactory = void 0;
const games_service_1 = require("./service/games.service");
class GamesFactory {
    static create(plataformActivityService, gameRepository, adminService) {
        const gameService = new games_service_1.GamesService(gameRepository, plataformActivityService, adminService);
        return gameService;
    }
}
exports.GamesFactory = GamesFactory;
//# sourceMappingURL=games.factory.js.map