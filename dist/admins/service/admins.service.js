"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsService = void 0;
const admins_entity_1 = require("./../entities/admins.entity");
class AdminsService {
    constructor(adminRepository, encryptionService) {
        this.adminRepository = adminRepository;
        this.encryptionService = encryptionService;
        void this.createMainAdminIfNotExists();
    }
    async createMainAdminIfNotExists() {
        try {
            await this.adminRepository.find({ email: "admin@ort.com" });
        }
        catch (e) {
            const hashedPassword = await this.encryptionService.hashPassword("Password1");
            const admin = admins_entity_1.Admin.create("admin", hashedPassword, "admin@ort.com", "");
            await this.adminRepository.create(admin);
        }
    }
    async find(filters) {
        return await this.adminRepository.find(filters);
    }
    async asignGameIdToAdmin(adminId, gameId) {
        await this.find({ _id: adminId }).then(async (admin) => {
            admin.gameId = gameId;
            await this.adminRepository.update(admin);
        });
    }
}
exports.AdminsService = AdminsService;
//# sourceMappingURL=admins.service.js.map