import { StocksServiceInterface } from "../../stock/service/stocks.service.interface";
import { AlgorithmsServicesInterface } from "./algorithms.service.interface";
import { TransactionServiceInterface } from "../../transactions/service/transactions.service.interface";
import { ShareInteraction } from "../../transactions/entities/shareInteraction.entity";
import { PlataformActivitiesServiceInterface } from "./../../plataform_activity/service/plataform_activities.service.interface";
import { LogType } from "./../../plataform_activity/entities/log-event";
import { AlgorithmType, Game } from "./../../game/entities/game.entity";
import { GamesServiceInterface } from "./../../game/service/games.service.interface";
import { RedisClient } from "src/database/redis.database";

export class AlgorithmsServices implements AlgorithmsServicesInterface {
  constructor(
    private readonly stocksService: StocksServiceInterface,
    private readonly transactionsService: TransactionServiceInterface,
    private readonly platformActivityService: PlataformActivitiesServiceInterface,
    private readonly gamesServicee: GamesServiceInterface,
    private readonly redisClient: RedisClient
  ) {}

  async getDecision(stockCode: string, gameId: string): Promise<string> {
    const game = (await this.gamesServicee.findById(gameId)) as Game;
    switch (game.algorithmType) {
      case AlgorithmType.PriceEvolution:
        return await this.priceEvolutionAlgorithm(stockCode, gameId);
      case AlgorithmType.TransactionBehaviour:
        return await this.transactionBehaviourAlgorithm(stockCode, gameId);
      default:
        await this.platformActivityService.create(
          "Algorithm not found",
          "Admin",
          LogType.error
        );
        return "Algorithm not found";
    }
  }

  private async priceEvolutionAlgorithm(
    stockCode: string,
    gameId: string
  ): Promise<string> {
    const cachedDecision = await this.redisClient.getDecisionFromRedis(
      `${stockCode}-${gameId}priceEvolution`
    );
    if (cachedDecision) return cachedDecision;

    const stock = await this.stocksService.find({
      code: stockCode,
      gameId: gameId,
    });
    const averageValue = this.calculateAverageValue(stock.historicalValues);
    const decision = stock.unitValue >= averageValue ? "sell" : "buy";

    await this.redisClient.storeDecisionInRedis(
      `${stock.code}-${gameId}priceEvolution`,
      decision
    );

    return decision;
  }

  private async transactionBehaviourAlgorithm(
    stockCode: string,
    gameId: string
  ): Promise<string> {
    const transactions = await this.transactionsService.findAll({
      stockCode: stockCode,
      gameId: gameId,
      limit: 100,
    });

    if (transactions.length <= 5) return "Wait";

    const cachedDecision = await this.redisClient.getDecisionFromRedis(
      `${stockCode}-${gameId}transactionBehaviour`
    );
    if (cachedDecision) return cachedDecision;

    const buyTransactions = transactions.filter(
      (transaction) => transaction.type === ShareInteraction.Purchase
    ).length;
    const sellTransactions = transactions.length - buyTransactions;

    const buyPercentage = (buyTransactions / transactions.length) * 100;
    const sellPercentage = (sellTransactions / transactions.length) * 100;

    let result = "Wait";

    if (buyPercentage >= 70) result = "Buy";
    if (sellPercentage >= 70) result = "Sell";

    await this.redisClient.storeDecisionInRedis(
      `${stockCode}-${gameId}transactionBehaviour`,
      result
    );
    return result;
  }

  private calculateAverageValue(
    historicalValues: { date: Date; value: number }[]
  ): number {
    return (
      historicalValues.reduce((a, b) => a + b.value, 0) /
      historicalValues.length
    );
  }
}
