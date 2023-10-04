"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const games_exceptions_1 = require("../games.exceptions");
const log_event_1 = require("../../plataform_activity/entities/log-event");
class GamesService {
    constructor(gamesRepository, plataformActivitiesService, adminService) {
        this.gamesRepository = gamesRepository;
        this.plataformActivitiesService = plataformActivitiesService;
        this.adminService = adminService;
        this.gameCodeValidator = (code) => {
            return /^[a-zA-Z0-9]{8}$/.test(code);
        };
    }
    async findById(id) {
        return this.gamesRepository.findById(id);
    }
    async create(game, creator, adminId) {
        this.validateCodes(game.codesToUse);
        this.validateGameDates(game);
        const gameCreated = await this.gamesRepository.create(game);
        await this.plataformActivitiesService.create("Game created", creator, log_event_1.LogType.info);
        await this.adminService.asignGameIdToAdmin(adminId, gameCreated.id.toString());
        return gameCreated;
    }
    validateGameDates(game) {
        const today = new Date();
        if (!game.startDate || !game.endDate)
            throw new games_exceptions_1.GameInsertDates();
        const eventStartDate = new Date(game.startDate);
        const eventEndDate = new Date(game.endDate);
        if (eventStartDate > eventEndDate)
            throw new games_exceptions_1.GameInconsistentDates();
        if (eventStartDate < today)
            throw new games_exceptions_1.GameInconsistentDates();
    }
    validateCodes(codes) {
        codes.forEach((code) => {
            if (!this.gameCodeValidator(code))
                throw new games_exceptions_1.GameInvalidCode();
        });
    }
    async getAll() {
        return this.gamesRepository.getAll();
    }
}
exports.GamesService = GamesService;
//# sourceMappingURL=games.service.js.map