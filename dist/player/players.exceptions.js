"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameNotFoundException = exports.PlayerInvalidMail = exports.PlayerInvalidPassword = exports.PlayerInvalidName = exports.PlayerAlreadyExistsException = void 0;
const app_exception_1 = require("../exception_filter/app.exception");
class PlayerAlreadyExistsException extends app_exception_1.AppException {
    constructor() {
        super(409, "Player already exists");
    }
}
exports.PlayerAlreadyExistsException = PlayerAlreadyExistsException;
class PlayerInvalidName extends app_exception_1.AppException {
    constructor() {
        super(400, "Player Invalid Name");
    }
}
exports.PlayerInvalidName = PlayerInvalidName;
class PlayerInvalidPassword extends app_exception_1.AppException {
    constructor() {
        super(400, "Player Invalid Password");
    }
}
exports.PlayerInvalidPassword = PlayerInvalidPassword;
class PlayerInvalidMail extends app_exception_1.AppException {
    constructor() {
        super(400, "Player Invalid Mail");
    }
}
exports.PlayerInvalidMail = PlayerInvalidMail;
class GameNotFoundException extends app_exception_1.AppException {
    constructor() {
        super(404, "Game code not found");
    }
}
exports.GameNotFoundException = GameNotFoundException;
//# sourceMappingURL=players.exceptions.js.map