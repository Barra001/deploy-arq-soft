"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersFactory = void 0;
const players_service_1 = require("./service/players.service");
class PlayersFactory {
    static create(encryptionService, plataformActivityService, gameRepository, playersRepository) {
        const playerService = new players_service_1.PlayersService(gameRepository, playersRepository, encryptionService, plataformActivityService);
        return playerService;
    }
}
exports.PlayersFactory = PlayersFactory;
//# sourceMappingURL=players.factory.js.map