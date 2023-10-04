"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = exports.TransactionSchema = exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
class Transaction extends mongoose_1.Document {
    constructor(stockCode, stockQuanity, playerId, gameId, type, date, stockValueOnTransaction) {
        super();
        this.stockCode = stockCode;
        this.quantity = stockQuanity;
        this.playerId = playerId;
        this.gameId = gameId;
        this.type = type;
        this.date = date;
        this.stockValueOnTransaction = stockValueOnTransaction;
    }
}
exports.Transaction = Transaction;
exports.TransactionSchema = new mongoose_1.Schema({
    stockCode: { type: String, required: true },
    quantity: { type: Number, required: true },
    stockValueOnTransaction: { type: Number, required: true },
    playerId: { type: String, required: true },
    gameId: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
});
exports.TransactionModel = (0, mongoose_1.model)("Transaction", exports.TransactionSchema);
//# sourceMappingURL=transactions.entity.js.map