"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameInsertDates = exports.GameInconsistentDates = exports.GameInvalidCode = exports.GameInvalidName = exports.GameAlreadyExistsException = void 0;
const app_exception_1 = require("../exception_filter/app.exception");
class GameAlreadyExistsException extends app_exception_1.AppException {
    constructor() {
        super(409, "Game already exists");
    }
}
exports.GameAlreadyExistsException = GameAlreadyExistsException;
class GameInvalidName extends app_exception_1.AppException {
    constructor() {
        super(400, "Game Invalid Name");
    }
}
exports.GameInvalidName = GameInvalidName;
class GameInvalidCode extends app_exception_1.AppException {
    constructor() {
        super(400, "Game Invalid Code");
    }
}
exports.GameInvalidCode = GameInvalidCode;
class GameInconsistentDates extends app_exception_1.AppException {
    constructor() {
        super(400, "Game Inconsistents Dates");
    }
}
exports.GameInconsistentDates = GameInconsistentDates;
class GameInsertDates extends app_exception_1.AppException {
    constructor() {
        super(400, "Game Insert Dates");
    }
}
exports.GameInsertDates = GameInsertDates;
//# sourceMappingURL=games.exceptions.js.map