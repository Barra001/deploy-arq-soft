"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientSharesToBuyException = exports.InsufficientStockToSellException = exports.InvalidStockCodeException = exports.UnsufficientFundsException = void 0;
const app_exception_1 = require("./../exception_filter/app.exception");
class UnsufficientFundsException extends app_exception_1.AppException {
    constructor() {
        super(400, "Fondos insuficientes");
    }
}
exports.UnsufficientFundsException = UnsufficientFundsException;
class InvalidStockCodeException extends app_exception_1.AppException {
    constructor() {
        super(400, "No hay acciones asociadas a este código");
    }
}
exports.InvalidStockCodeException = InvalidStockCodeException;
class InsufficientStockToSellException extends app_exception_1.AppException {
    constructor() {
        super(400, "No tienes suficientes acciones de este stock para vender");
    }
}
exports.InsufficientStockToSellException = InsufficientStockToSellException;
class InsufficientSharesToBuyException extends app_exception_1.AppException {
    constructor() {
        super(400, "No hay suficientes acciones de este stock para comprar");
    }
}
exports.InsufficientSharesToBuyException = InsufficientSharesToBuyException;
//# sourceMappingURL=transactions.exceptions.js.map