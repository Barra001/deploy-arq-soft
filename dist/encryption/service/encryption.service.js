"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const bcrypt_1 = require("bcrypt");
class EncryptionService {
    async hashPassword(password) {
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        return hashedPassword;
    }
    async comparePassowrd(password, hash) {
        return await (0, bcrypt_1.compare)(password, hash);
    }
}
exports.EncryptionService = EncryptionService;
//# sourceMappingURL=encryption.service.js.map