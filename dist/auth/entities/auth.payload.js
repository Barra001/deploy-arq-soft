"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPayload = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["PLAYER"] = "PLAYER";
})(Role || (exports.Role = Role = {}));
class AuthPayload {
    constructor(username, gameId, userId, role) {
        this.username = username;
        this.gameId = gameId;
        this.userId = userId;
        this.role = role;
    }
}
exports.AuthPayload = AuthPayload;
//# sourceMappingURL=auth.payload.js.map