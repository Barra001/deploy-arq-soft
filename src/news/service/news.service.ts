import { News } from "../entities/news.entity";
import { NewsRepositoryInterface } from "../repository/news.repository.interface";
import { NewsServiceInterface } from "./news.service.interface";
import { NewsInvalidDate } from "../news.exceptions";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
import { LogType } from "../../plataform_activity/entities/log-event";

export class NewsService implements NewsServiceInterface {
  constructor(
    private readonly newsRepository: NewsRepositoryInterface,
    private readonly plataformActivitiesService: PlataformActivitiesServiceInterface
  ) {}
  async getFromStockCode(code: string, gameId: string): Promise<News[]> {
    return await this.newsRepository.findAll({
      stockAssociated: { $in: [code] },
      gameId: gameId,
    });
  }

  async create(news: News): Promise<News> {
    this.validateNewsDate(news);
    const newsCreated = await this.newsRepository.create(news);
    await this.plataformActivitiesService.create(
      "News created",
      "Admin",
      LogType.info
    );
    return newsCreated;
  }

  async delete(news: News): Promise<string> {
    await this.newsRepository.delete(news.id.toString());
    await this.plataformActivitiesService.create(
      "News deleted",
      "Admin",
      LogType.info
    );
    return "News deleted successfully";
  }

  private validateNewsDate(news: News): void {
    const today: Date = new Date();
    const newsDate = new Date(news.date);
    if (newsDate > today) throw new NewsInvalidDate();
  }
}
