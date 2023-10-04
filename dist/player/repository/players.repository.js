"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersRepository = void 0;
const entity_repository_1 = require("../../database/entity.repository");
class PlayersRepository extends entity_repository_1.EntityRepository {
    constructor(playerModel) {
        super(playerModel);
    }
}
exports.PlayersRepository = PlayersRepository;
//# sourceMappingURL=players.repository.js.map