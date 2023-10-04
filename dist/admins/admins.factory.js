"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsFactory = void 0;
const admins_service_1 = require("./service/admins.service");
class AdminsFactory {
    static create(adminRepository, encryptionService) {
        const adminService = new admins_service_1.AdminsService(adminRepository, encryptionService);
        return adminService;
    }
}
exports.AdminsFactory = AdminsFactory;
//# sourceMappingURL=admins.factory.js.map