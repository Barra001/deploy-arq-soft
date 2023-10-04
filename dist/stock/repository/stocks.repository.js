"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksRepository = void 0;
const entity_repository_1 = require("../../database/entity.repository");
class StocksRepository extends entity_repository_1.EntityRepository {
    constructor(StockModel) {
        super(StockModel);
    }
}
exports.StocksRepository = StocksRepository;
//# sourceMappingURL=stocks.repository.js.map