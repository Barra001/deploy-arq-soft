import { Request, Response } from "express";
import { AuthServiceInterface } from "./../../auth/service/auth.service.interface";
import { AlgorithmsServicesInterface } from "./../services/algorithms.service.interface";
import { Role } from "./../../auth/entities/auth.payload";

export class AlgorithmsController {
  constructor(
    private readonly algorithmsService: AlgorithmsServicesInterface,
    private readonly authService: AuthServiceInterface
  ) {}

  async algorithmPrediction(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.PLAYER,
    ]);
    const gameId = payload.gameId;
    const stockCode = req.params.stockCode;
    const recommendation = await this.algorithmsService.getDecision(
      stockCode,
      gameId
    );
    res.send(recommendation);
  }
}
