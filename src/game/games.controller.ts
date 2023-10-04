import { Request, Response } from "express";
import { GamesServiceInterface } from "./service/games.service.interface";
import { Role } from "../auth/entities/auth.payload";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
import { Game } from "./entities/game.entity";

export class GamesController {
  constructor(
    private readonly gamesService: GamesServiceInterface,
    private readonly authService: AuthServiceInterface
  ) { }

  async create(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.ADMIN,
    ]);
    const data: Game = req.body;
    const creator = payload.username;
    const game = await this.gamesService.create(data, creator, payload.userId);
    res.send(game);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const games = await this.gamesService.getAll();
    res.send(games);
  }

}
