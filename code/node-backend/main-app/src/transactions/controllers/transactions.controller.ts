import { Request, Response } from "express";
import { TransactionServiceInterface } from "../service/transactions.service.interface";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
import { Transaction } from "../entities/transactions.entity";
import { Role } from "./../../auth/entities/auth.payload";
import { UserInformation } from "../entities/userInformation.entity";
import { Filters } from "../entities/filters.entity";

export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionServiceInterface,
    private readonly authService: AuthServiceInterface
  ) {}

  async buy(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.PLAYER,
    ]);
    const gameId = payload.gameId;
    const playerId = payload.userId;
    const data: Transaction = {
      ...req.body,
      gameId: gameId,
      playerId: playerId,
    };
    const transaction = await this.transactionService.buy(data);
    res.send(transaction);
  }

  async sell(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.PLAYER,
    ]);
    const gameId = payload.gameId;
    const playerId = payload.userId;
    const data: Transaction = {
      ...req.body,
      gameId: gameId,
      playerId: playerId,
    };
    const transaction = await this.transactionService.sell(data);
    res.send(transaction);
  }

  async get(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.PLAYER,
      Role.ADMIN,
    ]);
    const userInfo = new UserInformation(
      payload.gameId,
      payload.userId,
      payload.role
    );
    const filters = new Filters(
      req.query.startDate,
      req.query.endDate,
      req.query.stockCode,
      req.query.skip,
      req.query.limit
    );
    const transactions = await this.transactionService.get(userInfo, filters);
    res.send(transactions);
  }

  async getVolume(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.PLAYER,
      Role.ADMIN,
    ]);
    const gameId = payload.gameId;
    const stockCode = req.params.stockCode;
    const volume = await this.transactionService.calculateVolume(
      stockCode,
      gameId
    );
    res.send(volume.toString());
  }
}
