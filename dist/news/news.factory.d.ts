import { NewsRepositoryInterface } from "./repository/news.repository.interface";
import { NewsServiceInterface } from "./service/news.service.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
export declare class NewsFactory {
    static create(plataformActivityService: PlataformActivitiesServiceInterface, newsRepository: NewsRepositoryInterface): NewsServiceInterface;
}
