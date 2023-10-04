"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionFactory = void 0;
const encryption_service_1 = require("./service/encryption.service");
class EncryptionFactory {
    static create() {
        return new encryption_service_1.EncryptionService();
    }
}
exports.EncryptionFactory = EncryptionFactory;
//# sourceMappingURL=encryption.factory.js.map