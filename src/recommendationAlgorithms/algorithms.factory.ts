import { AlgorithmsServicesInterface } from "./services/algorithms.service.interface";
import { AlgorithmsServices } from "./services/algorithms.service";
import { StocksServiceInterface } from "src/stock/service/stocks.service.interface";
import { TransactionServiceInterface } from "src/transactions/service/transactions.service.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
import { GamesServiceInterface } from "src/game/service/games.service.interface";

export class AlgorithmsFactory {
  static create(
    stocksService: StocksServiceInterface,
    transactionsService: TransactionServiceInterface,
    PlataformActivitiesService: PlataformActivitiesServiceInterface,
    gameService: GamesServiceInterface
  ): AlgorithmsServicesInterface {
    const algorithmsService = new AlgorithmsServices(
      stocksService,
      transactionsService,
      PlataformActivitiesService,
      gameService
    );

    return algorithmsService;
  }
}
