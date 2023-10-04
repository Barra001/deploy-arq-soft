"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersController = void 0;
const auth_payload_1 = require("../auth/entities/auth.payload");
class PlayersController {
    constructor(playersService, authService) {
        this.playersService = playersService;
        this.authService = authService;
    }
    async register(req, res) {
        const data = req.body;
        const gameCode = req.query.gameCode;
        const player = await this.playersService.create(data, gameCode);
        res.send(player);
    }
    async logIn(req, res) {
        const user = req.body;
        const token = await this.authService.logInPlayer(user);
        res.setHeader("Authorization", token);
        res.json({ message: "Login Successful" });
    }
    async getPlayer(req, res) {
        const payload = await this.authService.verifyRequestForRoles(req, [
            auth_payload_1.Role.PLAYER,
        ]);
        const player = await this.playersService.getPlayer(payload.userId);
        res.send(player);
    }
}
exports.PlayersController = PlayersController;
//# sourceMappingURL=players.controller.js.map