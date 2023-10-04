"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.AdminSchema = exports.Admin = void 0;
const mongoose_1 = require("mongoose");
class Admin extends mongoose_1.Document {
    constructor(userName, password, email, gameId) {
        super();
        this.name = userName;
        this.password = password;
        this.email = email;
        this.gameId = gameId;
    }
    static create(userName, password, email, gameId) {
        return {
            name: userName,
            password: password,
            email: email,
            gameId: gameId,
        };
    }
}
exports.Admin = Admin;
exports.AdminSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    gameId: { type: String },
});
exports.AdminModel = (0, mongoose_1.model)("Admin", exports.AdminSchema);
//# sourceMappingURL=admins.entity.js.map