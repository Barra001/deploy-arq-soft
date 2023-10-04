"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockInvalidPrice = exports.StockAlreadyExistsException = exports.StockHasActiveTransactionsException = exports.UnauthorizedModificationOfStock = void 0;
const app_exception_1 = require("./../exception_filter/app.exception");
class UnauthorizedModificationOfStock extends app_exception_1.AppException {
    constructor() {
        super(401, "No está autorizado para modificar este stock");
    }
}
exports.UnauthorizedModificationOfStock = UnauthorizedModificationOfStock;
class StockHasActiveTransactionsException extends app_exception_1.AppException {
    constructor() {
        super(400, "El stock tiene transacciones activas");
    }
}
exports.StockHasActiveTransactionsException = StockHasActiveTransactionsException;
class StockAlreadyExistsException extends app_exception_1.AppException {
    constructor() {
        super(400, "Ya existe un stock con ese código");
    }
}
exports.StockAlreadyExistsException = StockAlreadyExistsException;
class StockInvalidPrice extends app_exception_1.AppException {
    constructor() {
        super(400, "El precio del stock debe ser mayor que cero");
    }
}
exports.StockInvalidPrice = StockInvalidPrice;
//# sourceMappingURL=stock.exceptions.js.map