import { AlgorithmsServicesInterface } from "./services/algorithms.service.interface";
import { StocksServiceInterface } from "src/stock/service/stocks.service.interface";
import { TransactionServiceInterface } from "src/transactions/service/transactions.service.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
import { GamesServiceInterface } from "src/game/service/games.service.interface";
import { RedisClient } from "src/database/redis.database";
export declare class AlgorithmsFactory {
    static create(stocksService: StocksServiceInterface, transactionsService: TransactionServiceInterface, PlataformActivitiesService: PlataformActivitiesServiceInterface, gameService: GamesServiceInterface, redisClient: RedisClient): AlgorithmsServicesInterface;
}
