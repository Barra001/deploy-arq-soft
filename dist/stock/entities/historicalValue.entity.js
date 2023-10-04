"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricalValueSchema = exports.HistoricalValue = void 0;
const mongoose_1 = require("mongoose");
class HistoricalValue {
    constructor(value, date) {
        this.value = value;
        this.date = date;
    }
}
exports.HistoricalValue = HistoricalValue;
exports.HistoricalValueSchema = new mongoose_1.Schema({
    value: { type: Number, required: true },
    date: { type: Date, required: true },
});
//# sourceMappingURL=historicalValue.entity.js.map