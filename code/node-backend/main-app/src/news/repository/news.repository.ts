import { Model } from "mongoose";
import { EntityRepository } from "../../database/entity.repository";
import { News } from "../entities/news.entity";
import { NewsRepositoryInterface } from "./news.repository.interface";

export class NewsRepository
  extends EntityRepository<News>
  implements NewsRepositoryInterface
{
  constructor(NewsModel: Model<News>) {
    super(NewsModel);
  }
}
