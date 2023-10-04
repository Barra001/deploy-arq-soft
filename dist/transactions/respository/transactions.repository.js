"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsRepository = void 0;
const entity_repository_1 = require("../../database/entity.repository");
class TransactionsRepository extends entity_repository_1.EntityRepository {
    constructor(TransactionModel) {
        super(TransactionModel);
    }
}
exports.TransactionsRepository = TransactionsRepository;
//# sourceMappingURL=transactions.repository.js.map