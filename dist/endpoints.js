"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initEndpoints = void 0;
const exception_filter_1 = require("./exception_filter/exception.filter");
const router_wrapper_1 = require("./router.wrapper");
const stocks_factory_1 = require("./stock/stocks.factory");
const players_factory_1 = require("./player/players.factory");
const encryption_factory_1 = require("./encryption/encryption.factory");
const auth_factory_1 = require("./auth/auth.factory");
const games_factory_1 = require("./game/games.factory");
const transactions_factory_1 = require("./transactions/transactions.factory");
const news_factory_1 = require("./news/news.factory");
const admins_factory_1 = require("./admins/admins.factory");
const algorithms_factory_1 = require("./recommendationAlgorithms/algorithms.factory");
const monitoring_service_factory_1 = require("./monitoring_service/monitoring_service.factory");
const stocks_controller_1 = require("./stock/stocks.controller");
const players_controller_1 = require("./player/players.controller");
const games_controller_1 = require("./game/games.controller");
const admins_controller_1 = require("./admins/controllers/admins.controller");
const transactions_controller_1 = require("./transactions/controllers/transactions.controller");
const news_controller_1 = require("./news/news.controller");
const algorithms_controllers_1 = require("./recommendationAlgorithms/controllers/algorithms.controllers");
const monitoring_service_controller_1 = require("./monitoring_service/controllers/monitoring_service.controller");
const games_repository_1 = require("./game/repository/games.repository");
const players_repository_1 = require("./player/repository/players.repository");
const admins_repository_1 = require("./admins/repository/admins.repository");
const news_repository_1 = require("./news/repository/news.repository");
const stocks_repository_1 = require("./stock/repository/stocks.repository");
const transactions_repository_1 = require("./transactions/respository/transactions.repository");
const game_entity_1 = require("./game/entities/game.entity");
const players_entity_1 = require("./player/entities/players.entity");
const admins_entity_1 = require("./admins/entities/admins.entity");
const news_entity_1 = require("./news/entities/news.entity");
const stock_entity_1 = require("./stock/entities/stock.entity");
const transactions_entity_1 = require("./transactions/entities/transactions.entity");
function initEndpoints(platformActivityService) {
    const RouterWrapper = new router_wrapper_1.AppRouterWrapper(exception_filter_1.AppExceptionFilter.catch, platformActivityService);
    const gameRepository = new games_repository_1.GamesRepository(game_entity_1.GameModel);
    const playersRepository = new players_repository_1.PlayersRepository(players_entity_1.PlayerModel);
    const adminsRepository = new admins_repository_1.AdminsRepository(admins_entity_1.AdminModel);
    const newsRepository = new news_repository_1.NewsRepository(news_entity_1.NewsModel);
    const stocksRepository = new stocks_repository_1.StocksRepository(stock_entity_1.StockModel);
    const transactionsRepository = new transactions_repository_1.TransactionsRepository(transactions_entity_1.TransactionModel);
    const encryptionService = encryption_factory_1.EncryptionFactory.create();
    const authService = auth_factory_1.AuthFactory.create(encryptionService, playersRepository, adminsRepository, gameRepository, platformActivityService);
    const playerService = players_factory_1.PlayersFactory.create(encryptionService, platformActivityService, gameRepository, playersRepository);
    const stocksService = stocks_factory_1.StocksFactory.create(stocksRepository);
    const transactionsService = transactions_factory_1.TransactionsFactory.create(transactionsRepository, stocksService, playerService, platformActivityService);
    const adminService = admins_factory_1.AdminsFactory.create(adminsRepository, encryptionService);
    const gamesService = games_factory_1.GamesFactory.create(platformActivityService, gameRepository, adminService);
    const newsService = news_factory_1.NewsFactory.create(platformActivityService, newsRepository);
    const algorithmsService = algorithms_factory_1.AlgorithmsFactory.create(stocksService, transactionsService, platformActivityService, gamesService);
    const monitoringService = monitoring_service_factory_1.MonitoringServiceFactory.create();
    const gamesController = new games_controller_1.GamesController(gamesService, authService);
    const stockController = new stocks_controller_1.StocksController(stocksService, authService);
    const playerController = new players_controller_1.PlayersController(playerService, authService);
    const adminController = new admins_controller_1.AdminsController(authService);
    const newsController = new news_controller_1.NewsController(newsService, authService);
    const transactionsController = new transactions_controller_1.TransactionsController(transactionsService, authService);
    const algorithmsController = new algorithms_controllers_1.AlgorithmsController(algorithmsService, authService);
    const monitoringServiceController = new monitoring_service_controller_1.MonitoringServiceController(monitoringService);
    RouterWrapper.post("/admins/login", (req, res) => adminController.logIn(req, res));
    RouterWrapper.post("/players", (req, res) => playerController.register(req, res));
    RouterWrapper.post("/players/login", (req, res) => playerController.logIn(req, res));
    RouterWrapper.get("/players", (req, res) => playerController.getPlayer(req, res));
    RouterWrapper.post("/stocks", (req, res) => stockController.create(req, res));
    RouterWrapper.get("/stocks", (req, res) => stockController.getAll(req, res));
    RouterWrapper.delete("/stocks/:id", (req, res) => stockController.delete(req, res));
    RouterWrapper.put("/stocks/:id", (req, res) => stockController.modify(req, res));
    RouterWrapper.post("/games", (req, res) => gamesController.create(req, res));
    RouterWrapper.get("/games", (req, res) => gamesController.getAll(req, res));
    RouterWrapper.post("/transactions/buy", (req, res) => transactionsController.buy(req, res));
    RouterWrapper.post("/transactions/sell", (req, res) => transactionsController.sell(req, res));
    RouterWrapper.get("/transactions", (req, res) => transactionsController.get(req, res));
    RouterWrapper.get("/transactions/volumes/:stockCode", (req, res) => transactionsController.getVolume(req, res));
    RouterWrapper.post("/news", (req, res) => newsController.create(req, res));
    RouterWrapper.delete("/news", (req, res) => newsController.delete(req, res));
    RouterWrapper.get("/news", (req, res) => newsController.getFromCode(req, res));
    RouterWrapper.get("/stocks/:stockCode", (req, res) => algorithmsController.algorithmPrediction(req, res));
    RouterWrapper.get("/status", (req, res) => monitoringServiceController.getSystemStatus(req, res));
    return RouterWrapper;
}
exports.initEndpoints = initEndpoints;
//# sourceMappingURL=endpoints.js.map