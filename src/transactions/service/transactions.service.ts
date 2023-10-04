import { Transaction } from "../entities/transactions.entity";
import { TransactionServiceInterface } from "./transactions.service.interface";
import { TransactionsRepositoryInterface } from "../respository/transactions.repository.interface";
import { StocksServiceInterface } from "src/stock/service/stocks.service.interface";
import { Player } from "src/player/entities/players.entity";
import {
  UnsufficientFundsException,
  InvalidStockCodeException,
  InsufficientStockToSellException,
  InsufficientSharesToBuyException,
} from "../transactions.exceptions";
import { Stock } from "src/stock/entities/stock.entity";
import { ShareInteraction } from "../entities/shareInteraction.entity";
import { PlayersServiceInterface } from "src/player/service/players.service.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
import { LogType } from "./../../plataform_activity/entities/log-event";
import { UserInformation } from "../entities/userInformation.entity";
import { Filters } from "../entities/filters.entity";

export class TransactionService implements TransactionServiceInterface {
  constructor(
    private readonly transactionRepository: TransactionsRepositoryInterface,
    private readonly stocksService: StocksServiceInterface,
    private readonly playersService: PlayersServiceInterface,
    private readonly platformActivitiesService: PlataformActivitiesServiceInterface
  ) {}

  async get(
    userInfo: UserInformation,
    filters: Filters
  ): Promise<Transaction[]> {
    if (userInfo.role === "player") {
      filters.playerId = userInfo.playerId;
    }
    if (filters.startDate || filters.endDate) {
      filters.date = {
        ...(filters.startDate && { $gte: filters.startDate }),
        ...(filters.endDate && { $lte: filters.endDate }),
      };
    }
    const validFilters = filters.getValidFilters();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { startDate, endDate, skip, limit, ...remainingFilters } =
      validFilters;
    remainingFilters.gameId = userInfo.gameId;
    const transactions = await this.transactionRepository.findAll(
      remainingFilters,
      skip,
      limit
    );

    return transactions;
  }

  async calculateVolume(stockCode: string, gameId: string): Promise<number> {
    const transactions = await this.transactionRepository.findAll({
      stockCode: stockCode,
      gameId: gameId,
    });
    const volume = transactions.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
    return volume;
  }

  async buy(transaction: Transaction): Promise<Transaction> {
    const player = await this.playersService.find({
      _id: transaction.playerId,
    });
    const stock = await this.validateExistentStock(
      transaction.stockCode,
      transaction.gameId
    );
    transaction.stockValueOnTransaction = stock.unitValue;
    transaction.type = ShareInteraction.Purchase;

    await this.validatePlayerBalance(transaction, player);
    await this.validateStockSharesQuanitity(stock, transaction.quantity);

    transaction.date = new Date();

    const confirmedTransaction = await this.transactionRepository.create(
      transaction
    );
    await this.updatePlayerBalance(confirmedTransaction, player);
    await this.playersService.addStockToPortfolio(confirmedTransaction);

    stock.availableStocksOnMarket -= transaction.quantity;
    stock.hasTransactions = true;
    await stock.save();
    await this.platformActivitiesService.create(
      "Stock purchased",
      `Player - ${stock.code}`,
      LogType.info
    );

    return confirmedTransaction;
  }

  async sell(transaction: Transaction): Promise<Transaction> {
    const player = await this.playersService.find({
      _id: transaction.playerId,
    });
    const stock = await this.validateExistentStock(
      transaction.stockCode,
      transaction.gameId
    );
    const hasStock = await this.playersService.validatePlayerHasStock(
      transaction.playerId,
      transaction.stockCode,
      transaction.quantity
    );

    if (!hasStock) throw new InsufficientStockToSellException();
    transaction.stockValueOnTransaction = stock.unitValue;
    transaction.type = ShareInteraction.Sell;
    transaction.date = new Date();

    const confirmedTransaction = await this.transactionRepository.create(
      transaction
    );
    await this.updatePlayerBalance(confirmedTransaction, player);
    await this.playersService.addStockToPortfolio(transaction);
    await this.platformActivitiesService.create(
      "Stock sold",
      `Player - ${stock.code}`,
      LogType.info
    );

    stock.availableStocksOnMarket += transaction.quantity;
    stock.hasTransactions = true;
    await stock.save();
    return confirmedTransaction;
  }

  async findAll(filters: {
    gameId: string;
    stockCode: string;
    limit: number;
  }): Promise<Transaction[]> {
    return await this.transactionRepository.findAll(filters);
  }

  private validatePlayerBalance(
    transaction: Transaction,
    player: Player
  ): void {
    const transactionValue =
      transaction.stockValueOnTransaction * transaction.quantity;
    if (transactionValue > player.balance)
      throw new UnsufficientFundsException();
  }

  private validateStockSharesQuanitity(stock: Stock, quantity: number): void {
    if (stock.availableStocksOnMarket < quantity)
      throw new InsufficientSharesToBuyException();
  }

  private async validateExistentStock(
    stockCode: string,
    gameId: string
  ): Promise<Stock> {
    try {
      const stock = await this.stocksService.find({
        code: stockCode,
        gameId: gameId,
      });
      return stock;
    } catch (error) {
      throw new InvalidStockCodeException();
    }
  }

  private async updatePlayerBalance(
    transaction: Transaction,
    player: Player
  ): Promise<void> {
    const transactionValue =
      transaction.stockValueOnTransaction * transaction.quantity;
    if (transaction.type === ShareInteraction.Purchase)
      player.balance -= transactionValue;
    else player.balance += transactionValue;
    await this.playersService.update(player);
  }
}
