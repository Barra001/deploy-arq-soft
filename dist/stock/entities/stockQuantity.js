"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockQuantityModel = exports.StockQuantitySchema = exports.StockQuantity = void 0;
const mongoose_1 = require("mongoose");
class StockQuantity {
    constructor(stockCode, quantity) {
        this.stockCode = stockCode;
        this.quantity = quantity;
    }
}
exports.StockQuantity = StockQuantity;
exports.StockQuantitySchema = new mongoose_1.Schema({
    stockCode: { type: String, required: true },
    quantity: { type: Number, required: true },
});
exports.StockQuantityModel = (0, mongoose_1.model)("StockQuantity", exports.StockQuantitySchema);
//# sourceMappingURL=stockQuantity.js.map