import { Request, Response } from "express";
import { NewsServiceInterface } from "./service/news.service.interface";
import { Role } from "../auth/entities/auth.payload";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
import { News } from "./entities/news.entity";

export class NewsController {
  constructor(
    private readonly newsService: NewsServiceInterface,
    private readonly authService: AuthServiceInterface
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.ADMIN,
    ]);
    const data: News = req.body;
    data.gameId = payload.gameId;
    const news = await this.newsService.create(data, payload.username);
    res.send(news);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.ADMIN,
    ]);
    const data: News = req.body;
    data.gameId = payload.gameId;
    const message = await this.newsService.delete(data, payload.username);
    res.json({ message: message });
  }

  async getFromCode(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.ADMIN,
      Role.PLAYER,
    ]);
    const code = req.query.stockCode;
    const news = await this.newsService.getFromStockCode(code, payload.gameId);
    res.send(news);
  }
}
