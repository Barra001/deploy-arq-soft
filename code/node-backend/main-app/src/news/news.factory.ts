
import { NewsRepositoryInterface } from "./repository/news.repository.interface";
import { NewsService } from "./service/news.service";
import { NewsServiceInterface } from "./service/news.service.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";

export class NewsFactory {
    static create(
        plataformActivityService: PlataformActivitiesServiceInterface,
        newsRepository: NewsRepositoryInterface,
    ): NewsServiceInterface {
        const newsService = new NewsService(
            newsRepository,
            plataformActivityService
        );
        return newsService;
    }
}
