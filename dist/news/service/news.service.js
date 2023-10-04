"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const news_exceptions_1 = require("../news.exceptions");
const log_event_1 = require("../../plataform_activity/entities/log-event");
class NewsService {
    constructor(newsRepository, plataformActivitiesService) {
        this.newsRepository = newsRepository;
        this.plataformActivitiesService = plataformActivitiesService;
    }
    async getFromStockCode(code, gameId) {
        return await this.newsRepository.findAll({
            stockAssociated: { $in: [code] },
            gameId: gameId,
        });
    }
    async create(news) {
        this.validateNewsDate(news);
        const newsCreated = await this.newsRepository.create(news);
        await this.plataformActivitiesService.create("News created", "Admin", log_event_1.LogType.info);
        return newsCreated;
    }
    async delete(news) {
        await this.newsRepository.delete(news.id.toString());
        await this.plataformActivitiesService.create("News deleted", "Admin", log_event_1.LogType.info);
        return "News deleted successfully";
    }
    validateNewsDate(news) {
        const today = new Date();
        const newsDate = new Date(news.date);
        if (newsDate > today)
            throw new news_exceptions_1.NewsInvalidDate();
    }
}
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map