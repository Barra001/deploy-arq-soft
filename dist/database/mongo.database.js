"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
async function connectToMongoDatabase() {
    dotenv_1.default.config();
    const uri = process.env.MONGO_URI;
    console.log("Connecting to: " + uri);
    try {
        await mongoose_1.default.connect(uri);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
exports.connectToMongoDatabase = connectToMongoDatabase;
//# sourceMappingURL=mongo.database.js.map