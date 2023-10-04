"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const auth_payload_1 = require("../auth/entities/auth.payload");
class NewsController {
    constructor(newsService, authService) {
        this.newsService = newsService;
        this.authService = authService;
    }
    async create(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.ADMIN,
        ]);
        const data = req.body;
        data.gameId = payload.gameId;
        const news = await this.newsService.create(data, payload.username);
        res.send(news);
    }
    async delete(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.ADMIN,
        ]);
        const data = req.body;
        data.gameId = payload.gameId;
        const message = await this.newsService.delete(data, payload.username);
        res.json({ message: message });
    }
    async getFromCode(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.ADMIN,
            auth_payload_1.Role.PLAYER,
        ]);
        const code = req.query.stockCode;
        const news = await this.newsService.getFromStockCode(code, payload.gameId);
        res.send(news);
    }
}
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map