"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModel = exports.NewsSchema = exports.News = void 0;
const mongoose_1 = require("mongoose");
class News extends mongoose_1.Document {
    constructor(title, content, gameId) {
        super();
        this.title = title;
        this.stockAssociated = [];
        this.content = content;
        this.gameId = gameId;
    }
    static create(title, date, content, stockAssociated, gameId) {
        return {
            title,
            date,
            content,
            stockAssociated,
            gameId
        };
    }
}
exports.News = News;
exports.NewsSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    stockAssociated: { type: [String], required: true },
    gameId: { type: String, required: true },
});
exports.NewsModel = (0, mongoose_1.model)("News", exports.NewsSchema);
//# sourceMappingURL=news.entity.js.map