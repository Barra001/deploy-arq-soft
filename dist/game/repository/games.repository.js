"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesRepository = void 0;
const entity_repository_1 = require("../../database/entity.repository");
class GamesRepository extends entity_repository_1.EntityRepository {
    constructor(gameModel) {
        super(gameModel);
    }
    async getGameByCode(code) {
        return await this.find({ codesToUse: { $in: [code] } });
    }
    async removeGameCode(game, code) {
        game.codesToUse = game.codesToUse.filter((c) => c !== code);
        return await this.update(game);
    }
}
exports.GamesRepository = GamesRepository;
//# sourceMappingURL=games.repository.js.map