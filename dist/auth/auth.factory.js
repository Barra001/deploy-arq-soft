"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactory = void 0;
const auth_service_1 = require("./service/auth.service");
class AuthFactory {
    static create(encryptionService, playersRepository, adminsRepository, gamesRepository, plataformActivitiesServiceInterface) {
        const authService = new auth_service_1.AuthService(gamesRepository, playersRepository, adminsRepository, encryptionService, plataformActivitiesServiceInterface);
        return authService;
    }
}
exports.AuthFactory = AuthFactory;
//# sourceMappingURL=auth.factory.js.map