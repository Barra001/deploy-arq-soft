"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsFactory = void 0;
const news_service_1 = require("./service/news.service");
class NewsFactory {
    static create(plataformActivityService, newsRepository) {
        const newsService = new news_service_1.NewsService(newsRepository, plataformActivityService);
        return newsService;
    }
}
exports.NewsFactory = NewsFactory;
//# sourceMappingURL=news.factory.js.map