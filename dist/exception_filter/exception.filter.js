"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppExceptionFilter = void 0;
const app_exception_1 = require("./app.exception");
const log_event_1 = require("./../plataform_activity/entities/log-event");
class AppExceptionFilter {
    static catch(error, req, res, plataformActivity) {
        let status = 500;
        if (error instanceof app_exception_1.AppException) {
            status = error.httpStatusCode;
        }
        if (status === 500) {
            plataformActivity.create(error.message, "System", log_event_1.LogType.error);
        }
        res.status(status).json({
            message: error.message,
            statusCode: status,
            path: req.url,
        });
    }
}
exports.AppExceptionFilter = AppExceptionFilter;
//# sourceMappingURL=exception.filter.js.map