"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsInsertDates = exports.NewsInvalidDate = exports.NewsInvalidName = void 0;
const app_exception_1 = require("../exception_filter/app.exception");
class NewsInvalidName extends app_exception_1.AppException {
    constructor() {
        super(400, "News Invalid Name");
    }
}
exports.NewsInvalidName = NewsInvalidName;
class NewsInvalidDate extends app_exception_1.AppException {
    constructor() {
        super(400, "News Invalid Date");
    }
}
exports.NewsInvalidDate = NewsInvalidDate;
class NewsInsertDates extends app_exception_1.AppException {
    constructor() {
        super(400, "News Insert Dates");
    }
}
exports.NewsInsertDates = NewsInsertDates;
//# sourceMappingURL=news.exceptions.js.map