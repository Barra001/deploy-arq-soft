import { News } from "../entities/news.entity";
import { NewsRepositoryInterface } from "../repository/news.repository.interface";
import { NewsServiceInterface } from "./news.service.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
export declare class NewsService implements NewsServiceInterface {
    private readonly newsRepository;
    private readonly plataformActivitiesService;
    constructor(newsRepository: NewsRepositoryInterface, plataformActivitiesService: PlataformActivitiesServiceInterface);
    getFromStockCode(code: string, gameId: string): Promise<News[]>;
    create(news: News): Promise<News>;
    delete(news: News): Promise<string>;
    private validateNewsDate;
}
