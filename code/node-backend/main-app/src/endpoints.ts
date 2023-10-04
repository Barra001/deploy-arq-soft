import { AppExceptionFilter } from "./exception_filter/exception.filter";

import { AppRouterWrapper } from "./router.wrapper";

//factories
import { StocksFactory } from "./stock/stocks.factory";
import { PlayersFactory } from "./player/players.factory";
import { EncryptionFactory } from "./encryption/encryption.factory";
import { AuthFactory } from "./auth/auth.factory";
import { GamesFactory } from "./game/games.factory";
import { TransactionsFactory } from "./transactions/transactions.factory";
import { NewsFactory } from "./news/news.factory";
import { AdminsFactory } from "./admins/admins.factory";
import { AlgorithmsFactory } from "./recommendationAlgorithms/algorithms.factory";
import { MonitoringServiceFactory } from "./monitoring_service/monitoring_service.factory";

//controllers
import { StocksController } from "./stock/stocks.controller";
import { PlayersController } from "./player/players.controller";
import { GamesController } from "./game/games.controller";
import { AdminsController } from "./admins/controllers/admins.controller";
import { TransactionsController } from "./transactions/controllers/transactions.controller";
import { NewsController } from "./news/news.controller";
import { AlgorithmsController } from "./recommendationAlgorithms/controllers/algorithms.controllers";
import { MonitoringServiceController } from "./monitoring_service/controllers/monitoring_service.controller";

//repositories
import { GamesRepository } from "./game/repository/games.repository";
import { PlayersRepository } from "./player/repository/players.repository";
import { AdminsRepository } from "./admins/repository/admins.repository";
import { NewsRepository } from "./news/repository/news.repository";
import { StocksRepository } from "./stock/repository/stocks.repository";
import { TransactionsRepository } from "./transactions/respository/transactions.repository";

//models
import { GameModel } from "./game/entities/game.entity";
import { PlayerModel } from "./player/entities/players.entity";
import { AdminModel } from "./admins/entities/admins.entity";
import { NewsModel } from "./news/entities/news.entity";
import { StockModel } from "./stock/entities/stock.entity";
import { TransactionModel } from "./transactions/entities/transactions.entity";

//services
import { PlataformActivitiesServiceInterface } from "./plataform_activity/service/plataform_activities.service.interface";
import { RedisClient } from "./database/redis.database";

export function initEndpoints(
  platformActivityService: PlataformActivitiesServiceInterface,
  redisClient: RedisClient
): AppRouterWrapper {
  const RouterWrapper = new AppRouterWrapper(
    AppExceptionFilter.catch,
    platformActivityService
  );

  const gameRepository = new GamesRepository(GameModel);
  const playersRepository = new PlayersRepository(PlayerModel);
  const adminsRepository = new AdminsRepository(AdminModel);
  const newsRepository = new NewsRepository(NewsModel);
  const stocksRepository = new StocksRepository(StockModel);
  const transactionsRepository = new TransactionsRepository(TransactionModel);
  const encryptionService = EncryptionFactory.create();
  const authService = AuthFactory.create(
    encryptionService,
    playersRepository,
    adminsRepository,
    gameRepository,
    platformActivityService
  );
  const playerService = PlayersFactory.create(
    encryptionService,
    platformActivityService,
    gameRepository,
    playersRepository
  );
  const stocksService = StocksFactory.create(stocksRepository);
  const transactionsService = TransactionsFactory.create(
    transactionsRepository,
    stocksService,
    playerService,
    platformActivityService
  );
  const adminService = AdminsFactory.create(
    adminsRepository,
    encryptionService
  );
  const gamesService = GamesFactory.create(
    platformActivityService,
    gameRepository,
    adminService
  );
  const newsService = NewsFactory.create(
    platformActivityService,
    newsRepository
  );
  const algorithmsService = AlgorithmsFactory.create(
    stocksService,
    transactionsService,
    platformActivityService,
    gamesService,
    redisClient
  );
  const monitoringService = MonitoringServiceFactory.create();
  const gamesController = new GamesController(gamesService, authService);
  const stockController = new StocksController(stocksService, authService);
  const playerController = new PlayersController(playerService, authService);
  const adminController = new AdminsController(authService);

  const newsController = new NewsController(newsService, authService);
  const transactionsController = new TransactionsController(
    transactionsService,
    authService
  );
  const algorithmsController = new AlgorithmsController(
    algorithmsService,
    authService
  );

  const monitoringServiceController = new MonitoringServiceController(
    monitoringService,
    redisClient
  );

  /*----------------------ADMINS----------------------*/
  RouterWrapper.post("/admins/login", (req, res) =>
    adminController.logIn(req, res)
  );

  /*----------------------PLAYERS----------------------*/
  RouterWrapper.post("/players", (req, res) =>
    playerController.register(req, res)
  );

  RouterWrapper.post("/players/login", (req, res) =>
    playerController.logIn(req, res)
  );

  RouterWrapper.get("/players", (req, res) =>
    playerController.getPlayer(req, res)
  );

  /*----------------------STOCKS----------------------*/
  RouterWrapper.post("/stocks", (req, res) => stockController.create(req, res));
  RouterWrapper.get("/stocks", (req, res) => stockController.getAll(req, res));
  RouterWrapper.delete("/stocks/:id", (req, res) =>
    stockController.delete(req, res)
  );
  RouterWrapper.put("/stocks/:id", (req, res) =>
    stockController.modify(req, res)
  );

  /*----------------------GAMES----------------------*/
  RouterWrapper.post("/games", (req, res) => gamesController.create(req, res));
  RouterWrapper.get("/games", (req, res) => gamesController.getAll(req, res));

  /*----------------------TRANSACTIONS----------------------*/
  RouterWrapper.post("/transactions/buy", (req, res) =>
    transactionsController.buy(req, res)
  );
  RouterWrapper.post("/transactions/sell", (req, res) =>
    transactionsController.sell(req, res)
  );
  RouterWrapper.get("/transactions", (req, res) =>
    transactionsController.get(req, res)
  );
  RouterWrapper.get("/transactions/volumes/:stockCode", (req, res) =>
    transactionsController.getVolume(req, res)
  );

  /*----------------------News----------------------*/
  RouterWrapper.post("/news", (req, res) => newsController.create(req, res));
  RouterWrapper.delete("/news", (req, res) => newsController.delete(req, res));
  RouterWrapper.get("/news", (req, res) =>
    newsController.getFromCode(req, res)
  );

  /*----------------------ALGORITHMS----------------------*/
  RouterWrapper.get("/stocks/:stockCode", (req, res) =>
    algorithmsController.algorithmPrediction(req, res)
  );

  /*----------------------Monitoring----------------------*/
  RouterWrapper.get("/status", (req, res) =>
    monitoringServiceController.getSystemStatus(req, res)
  );

  return RouterWrapper;
}
