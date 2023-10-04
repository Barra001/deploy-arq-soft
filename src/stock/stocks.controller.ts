import { Request, Response } from "express";
import { StocksServiceInterface } from "./service/stocks.service.interface";
import { Stock } from "./entities/stock.entity";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
import { Role } from "./../auth/entities/auth.payload";

export class StocksController {
  constructor(
    private readonly stocksService: StocksServiceInterface,
    private readonly authService: AuthServiceInterface
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.ADMIN,
      Role.PLAYER,
    ]);
    const gameId = payload.gameId;
    const data: Stock = { ...req.body, gameId: gameId };
    const stock = await this.stocksService.create(data);
    res.send(stock);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [ Role.ADMIN, Role.PLAYER ]);
    const filters = { ...req.query, gameId: payload.gameId };
    const stocks = await this.stocksService.findAll(filters);
    res.send(stocks);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.ADMIN,
      Role.PLAYER,
    ]);
    const gameId = payload.gameId;
    const id = req.params.id;
    const stock = await this.stocksService.delete(id, gameId);
    res.send(stock);
  }

  async modify(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.ADMIN,
      Role.PLAYER,
    ]);
    const gameId = payload.gameId;
    const id = req.params.id;
    const data: Stock = { ...req.body, gameId: gameId };
    const stock = await this.stocksService.modify(id, data);
    res.send(stock);
  }
}
