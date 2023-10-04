import { Player } from "../entities/players.entity";
import {
  PlayerAlreadyExistsException,
  PlayerInvalidName,
  PlayerInvalidPassword,
  PlayerInvalidMail,
  GameNotFoundException,
} from "../players.exceptions";
import { MIN_LENGTH_PASSWORD, MIN_LENGTH_USERNAME } from "../players.consts";

import { PlayersServiceInterface } from "./players.service.interface";
import { EncryptionServiceInterface } from "src/encryption/service/encryption.interface";
import { PlataformActivitiesServiceInterface } from "../../plataform_activity/service/plataform_activities.service.interface";
import { LogType } from "../../plataform_activity/entities/log-event";
import { GamesRepositoryInterface } from "src/game/repository/games.repository.interface";
import { PlayersRepositoryInterface } from "../repository/players.repository.interface";
import { NotFoundException } from "./../../database/entity.repository";
import { Game } from "./../../game/entities/game.entity";
import { Transaction } from "./../../transactions/entities/transactions.entity";
import { StockQuantity } from "./../../stock/entities/stockQuantity";
import { ShareInteraction } from "./../../transactions/entities/shareInteraction.entity";

export class PlayersService implements PlayersServiceInterface {
  constructor(
    private readonly gamesRepository: GamesRepositoryInterface,
    private readonly playersRepository: PlayersRepositoryInterface,
    private readonly encryptionService: EncryptionServiceInterface,
    private readonly plataformActivitiesService: PlataformActivitiesServiceInterface
  ) {}
  async getPlayer(userId: string): Promise<Player> {
    const player = await this.playersRepository.find({
      _id: userId.toString(),
    });
    return player;
  }
  async create(player: Player, gameCode: string): Promise<Player> {
    this.validatePlayer(player);

    let game: Game;
    try {
      game = await this.gamesRepository.getGameByCode(gameCode);
    } catch (error) {
      if (error instanceof NotFoundException) throw new GameNotFoundException();
      throw error;
    }

    await this.validatePlayerDoesNotExists(player, game);

    player.gameId = game.id.toString();
    player = await this.encryptPlayerPassword(player);

    const playerCreated = await this.playersRepository.create(player);

    await this.gamesRepository.removeGameCode(game, gameCode);

    await this.plataformActivitiesService.create(
      "Player created",
      "Player",
      LogType.info
    );
    return playerCreated;
  }

  async find(filters = {}): Promise<Player> {
    return await this.playersRepository.find(filters);
  }

  async update(player: Player): Promise<Player> {
    return await this.playersRepository.update(player);
  }

  async validatePlayerHasStock(
    playerId: string,
    stockCode: string,
    stockQuanity: number
  ): Promise<boolean> {
    const player = await this.playersRepository.find({ _id: playerId });
    const stockIndex = player.portfolio.findIndex(
      (stock) => stock.stockCode === stockCode
    );
    if (stockIndex === -1) return false;
    if (player.portfolio[stockIndex].quantity < stockQuanity) return false;
    return true;
  }

  async addStockToPortfolio(transaction: Transaction): Promise<void> {
    const player = await this.playersRepository.find({
      _id: transaction.playerId,
    });
    const transactionQuantity =
      transaction.type === ShareInteraction.Purchase
        ? transaction.quantity
        : -transaction.quantity;
    const stockToAdd: StockQuantity = {
      stockCode: transaction.stockCode,
      quantity: transactionQuantity,
    };
    const updatedPlayer = this.addOrCreateStockQuantity(player, stockToAdd);
    await this.playersRepository.update(updatedPlayer);
  }

  private addOrCreateStockQuantity(
    player: Player,
    stockToAdd: StockQuantity
  ): Player {
    const stockIndex = player.portfolio.findIndex(
      (stock) => stock.stockCode === stockToAdd.stockCode
    );
    if (stockIndex === -1) {
      player.portfolio.push(stockToAdd);
    } else {
      player.portfolio[stockIndex].quantity += stockToAdd.quantity;
    }
    return player;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePlayer(player: Player): void {
    if (!player.name || player.name.length < MIN_LENGTH_USERNAME)
      throw new PlayerInvalidName();
    if (!player.password || player.password.length < MIN_LENGTH_PASSWORD)
      throw new PlayerInvalidPassword();
    if (!player.email || !this.validateEmail(player.email))
      throw new PlayerInvalidMail();
  }

  private async validatePlayerDoesNotExists(
    player: Player,
    game: Game
  ): Promise<void> {
    try {
      const playerExists = await this.playersRepository.find({
        email: player.email,
        gameId: game.id,
      });

      if (playerExists != undefined) throw new PlayerAlreadyExistsException();
    } catch (error) {
      if (error instanceof NotFoundException) return;
      throw error;
    }
  }

  private async encryptPlayerPassword(player: Player): Promise<Player> {
    player.password = await this.encryptionService.hashPassword(
      player.password
    );
    return player;
  }
}
