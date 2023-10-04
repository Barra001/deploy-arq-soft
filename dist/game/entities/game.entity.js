"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = exports.GameSchema = exports.Game = exports.AlgorithmType = void 0;
const mongoose_1 = require("mongoose");
var AlgorithmType;
(function (AlgorithmType) {
    AlgorithmType["TransactionBehaviour"] = "transactionBehaviour";
    AlgorithmType["PriceEvolution"] = "priceEvolution";
})(AlgorithmType || (exports.AlgorithmType = AlgorithmType = {}));
class Game extends mongoose_1.Document {
    constructor(name) {
        super();
        this.name = name;
        this.codesToUse = [];
    }
    static create(name, startDate, endDate, codesToUse, algorithmType) {
        return {
            name: name,
            startDate: startDate,
            endDate: endDate,
            codesToUse: codesToUse,
            algorithmType: algorithmType,
        };
    }
}
exports.Game = Game;
exports.GameSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    codesToUse: { type: [String], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    algorithmType: {
        type: String,
        enum: ["transactionBehaviour", "priceEvolution"],
        required: true,
    },
});
exports.GameModel = (0, mongoose_1.model)("Game", exports.GameSchema);
//# sourceMappingURL=game.entity.js.map