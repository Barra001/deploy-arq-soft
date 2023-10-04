"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = void 0;
class AppException extends Error {
    constructor(httpStatusCode, message) {
        super(message);
        this.httpStatusCode = httpStatusCode;
    }
}
exports.AppException = AppException;
//# sourceMappingURL=app.exception.js.map