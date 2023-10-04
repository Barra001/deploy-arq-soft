import { StocksServiceInterface } from "../../stock/service/stocks.service.interface";
import { AlgorithmsServicesInterface } from "./algorithms.service.interface";
import { TransactionServiceInterface } from "../../transactions/service/transactions.service.interface";
import { PlataformActivitiesServiceInterface } from "./../../plataform_activity/service/plataform_activities.service.interface";
import { GamesServiceInterface } from "./../../game/service/games.service.interface";
import { RedisClient } from "src/database/redis.database";
export declare class AlgorithmsServices implements AlgorithmsServicesInterface {
    private readonly stocksService;
    private readonly transactionsService;
    private readonly platformActivityService;
    private readonly gamesServicee;
    private readonly redisClient;
    constructor(stocksService: StocksServiceInterface, transactionsService: TransactionServiceInterface, platformActivityService: PlataformActivitiesServiceInterface, gamesServicee: GamesServiceInterface, redisClient: RedisClient);
    getDecision(stockCode: string, gameId: string): Promise<string>;
    private priceEvolutionAlgorithm;
    private transactionBehaviourAlgorithm;
    private calculateAverageValue;
}
