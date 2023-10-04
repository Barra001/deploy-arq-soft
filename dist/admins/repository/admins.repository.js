"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsRepository = void 0;
const entity_repository_1 = require("../../database/entity.repository");
class AdminsRepository extends entity_repository_1.EntityRepository {
    constructor(playerModel) {
        super(playerModel);
    }
}
exports.AdminsRepository = AdminsRepository;
//# sourceMappingURL=admins.repository.js.map