"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerModel = exports.PlayerSchema = exports.Player = void 0;
const mongoose_1 = require("mongoose");
const stockQuantity_1 = require("./../../stock/entities/stockQuantity");
class Player extends mongoose_1.Document {
    constructor(userName, password, email, gameId, balance) {
        super();
        this.name = userName;
        this.password = password;
        this.email = email;
        this.gameId = gameId;
        this.balance = balance;
        this.portfolio = [];
    }
}
exports.Player = Player;
exports.PlayerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    gameId: { type: String, required: true },
    balance: { type: Number, required: true, default: 1000 },
    portfolio: { type: [stockQuantity_1.StockQuantitySchema], required: true },
});
exports.PlayerModel = (0, mongoose_1.model)("Player", exports.PlayerSchema);
//# sourceMappingURL=players.entity.js.map