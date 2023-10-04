"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockModel = exports.StockSchema = exports.Stock = void 0;
const mongoose_1 = require("mongoose");
const historicalValue_entity_1 = require("./historicalValue.entity");
class Stock extends mongoose_1.Document {
    constructor(code, name, description, unitValue, gameId, historicalValues, availableStocksOnMarket, totalStocksOnMarket, hasTransactions) {
        super();
        this.code = code;
        this.name = name;
        this.description = description;
        this.unitValue = unitValue;
        this.gameId = gameId;
        this.historicalValues = historicalValues;
        this.availableStocksOnMarket = availableStocksOnMarket;
        this.totalStocksOnMarket = totalStocksOnMarket;
        this.hasTransactions = hasTransactions;
    }
    static create(code, name, description, unitValue, gameId, historicalValues, availableStocksOnMarket, totalStocksOnMarket, hasTransactions) {
        return {
            code: code,
            name: name,
            description: description,
            unitValue: unitValue,
            gameId: gameId,
            historicalValues: historicalValues,
            availableStocksOnMarket: availableStocksOnMarket,
            totalStocksOnMarket: totalStocksOnMarket,
            hasTransactions: hasTransactions,
        };
    }
}
exports.Stock = Stock;
const stockCodeValidator = (code) => {
    return /^[A-Z]{1,6}$/.test(code);
};
exports.StockSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: stockCodeValidator,
            message: "Code must have 6 or fewer uppercase letters.",
        },
    },
    name: { type: String, required: true },
    description: { type: String },
    unitValue: { type: Number, required: true },
    historicalValues: { type: [historicalValue_entity_1.HistoricalValueSchema], required: true },
    gameId: { type: String, required: true },
    availableStocksOnMarket: { type: Number, required: true },
    totalStocksOnMarket: { type: Number, required: true },
    hasTransactions: { type: Boolean, required: true, default: false },
});
exports.StockModel = (0, mongoose_1.model)("Stock", exports.StockSchema);
//# sourceMappingURL=stock.entity.js.map