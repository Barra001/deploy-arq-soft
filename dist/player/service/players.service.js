"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const players_exceptions_1 = require("../players.exceptions");
const players_consts_1 = require("../players.consts");
const log_event_1 = require("../../plataform_activity/entities/log-event");
const entity_repository_1 = require("./../../database/entity.repository");
const shareInteraction_entity_1 = require("./../../transactions/entities/shareInteraction.entity");
class PlayersService {
    constructor(gamesRepository, playersRepository, encryptionService, plataformActivitiesService) {
        this.gamesRepository = gamesRepository;
        this.playersRepository = playersRepository;
        this.encryptionService = encryptionService;
        this.plataformActivitiesService = plataformActivitiesService;
    }
    async getPlayer(userId) {
        const player = await this.playersRepository.find({
            _id: userId.toString(),
        });
        return player;
    }
    async create(player, gameCode) {
        this.validatePlayer(player);
        let game;
        try {
            game = await this.gamesRepository.getGameByCode(gameCode);
        }
        catch (error) {
            if (error instanceof entity_repository_1.NotFoundException)
                throw new players_exceptions_1.GameNotFoundException();
            throw error;
        }
        await this.validatePlayerDoesNotExists(player, game);
        player.gameId = game.id.toString();
        player = await this.encryptPlayerPassword(player);
        const playerCreated = await this.playersRepository.create(player);
        await this.gamesRepository.removeGameCode(game, gameCode);
        await this.plataformActivitiesService.create("Player created", "Player", log_event_1.LogType.info);
        return playerCreated;
    }
    async find(filters = {}) {
        return await this.playersRepository.find(filters);
    }
    async update(player) {
        return await this.playersRepository.update(player);
    }
    async validatePlayerHasStock(playerId, stockCode, stockQuanity) {
        const player = await this.playersRepository.find({ _id: playerId });
        const stockIndex = player.portfolio.findIndex((stock) => stock.stockCode === stockCode);
        if (stockIndex === -1)
            return false;
        if (player.portfolio[stockIndex].quantity < stockQuanity)
            return false;
        return true;
    }
    async addStockToPortfolio(transaction) {
        const player = await this.playersRepository.find({
            _id: transaction.playerId,
        });
        const transactionQuantity = transaction.type === shareInteraction_entity_1.ShareInteraction.Purchase
            ? transaction.quantity
            : -transaction.quantity;
        const stockToAdd = {
            stockCode: transaction.stockCode,
            quantity: transactionQuantity,
        };
        const updatedPlayer = this.addOrCreateStockQuantity(player, stockToAdd);
        await this.playersRepository.update(updatedPlayer);
    }
    addOrCreateStockQuantity(player, stockToAdd) {
        const stockIndex = player.portfolio.findIndex((stock) => stock.stockCode === stockToAdd.stockCode);
        if (stockIndex === -1) {
            player.portfolio.push(stockToAdd);
        }
        else {
            player.portfolio[stockIndex].quantity += stockToAdd.quantity;
        }
        return player;
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    validatePlayer(player) {
        if (!player.name || player.name.length < players_consts_1.MIN_LENGTH_USERNAME)
            throw new players_exceptions_1.PlayerInvalidName();
        if (!player.password || player.password.length < players_consts_1.MIN_LENGTH_PASSWORD)
            throw new players_exceptions_1.PlayerInvalidPassword();
        if (!player.email || !this.validateEmail(player.email))
            throw new players_exceptions_1.PlayerInvalidMail();
    }
    async validatePlayerDoesNotExists(player, game) {
        try {
            const playerExists = await this.playersRepository.find({
                email: player.email,
                gameId: game.id,
            });
            if (playerExists != undefined)
                throw new players_exceptions_1.PlayerAlreadyExistsException();
        }
        catch (error) {
            if (error instanceof entity_repository_1.NotFoundException)
                return;
            throw error;
        }
    }
    async encryptPlayerPassword(player) {
        player.password = await this.encryptionService.hashPassword(player.password);
        return player;
    }
}
exports.PlayersService = PlayersService;
//# sourceMappingURL=players.service.js.map