"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameNotExistsException = exports.UserNotExistsException = exports.InvalidTokenException = exports.NoTokenPresentException = exports.NotEnoughPrivilegesException = exports.UndefinedUserException = exports.UndefinedRoleException = void 0;
const app_exception_1 = require("./../exception_filter/app.exception");
class UndefinedRoleException extends app_exception_1.AppException {
    constructor() {
        super(400, "El rol no fue definido");
    }
}
exports.UndefinedRoleException = UndefinedRoleException;
class UndefinedUserException extends app_exception_1.AppException {
    constructor() {
        super(400, "El usuario no fue definido");
    }
}
exports.UndefinedUserException = UndefinedUserException;
class NotEnoughPrivilegesException extends app_exception_1.AppException {
    constructor() {
        super(403, "El usuario no tiene suficientes privilegios");
    }
}
exports.NotEnoughPrivilegesException = NotEnoughPrivilegesException;
class NoTokenPresentException extends app_exception_1.AppException {
    constructor() {
        super(401, "No se encontró un token de usuario en la solicitud");
    }
}
exports.NoTokenPresentException = NoTokenPresentException;
class InvalidTokenException extends app_exception_1.AppException {
    constructor() {
        super(401, "Token inválido");
    }
}
exports.InvalidTokenException = InvalidTokenException;
class UserNotExistsException extends app_exception_1.AppException {
    constructor() {
        super(401, "El usuario no existe");
    }
}
exports.UserNotExistsException = UserNotExistsException;
class GameNotExistsException extends app_exception_1.AppException {
    constructor() {
        super(404, "Juego no encontrado");
    }
}
exports.GameNotExistsException = GameNotExistsException;
//# sourceMappingURL=auth.exceptions.js.map