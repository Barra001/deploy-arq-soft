"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_payload_1 = require("./../entities/auth.payload");
const auth_exceptions_1 = require("./../auth.exceptions");
const jsonwebtoken_1 = require("jsonwebtoken");
const fs_1 = require("fs");
const entity_repository_1 = require("./../../database/entity.repository");
const log_event_1 = require("./../../plataform_activity/entities/log-event");
const privateKey = (0, fs_1.readFileSync)("./private.key");
const publicKey = (0, fs_1.readFileSync)("./public.key");
class AuthService {
    constructor(gamesRepository, playersRepository, adminsRepository, encryptionService, platformActivityService) {
        this.gamesRepository = gamesRepository;
        this.playersRepository = playersRepository;
        this.adminsRepository = adminsRepository;
        this.encryptionService = encryptionService;
        this.platformActivityService = platformActivityService;
    }
    async generateToken(payload) {
        const token = await (0, jsonwebtoken_1.sign)(payload, privateKey, AuthService.tokenOptions);
        return token;
    }
    async logInPlayer(user) {
        if (!user) {
            throw new auth_exceptions_1.UndefinedUserException();
        }
        const game = await this.gamesRepository.find({ name: user.gameName });
        let userInDb;
        try {
            userInDb = await this.playersRepository.find({
                email: user.email,
                gameId: game.id,
            });
        }
        catch (error) {
            if (error instanceof entity_repository_1.NotFoundException) {
                await this.platformActivityService.create("Player tied to log with invalid credentials", user.email, log_event_1.LogType.info);
                throw new auth_exceptions_1.UserNotExistsException();
            }
            throw error;
        }
        await this.validatePassword(user.password, userInDb.password);
        const payload = {
            username: user.email,
            userId: userInDb.id,
            gameId: userInDb.gameId,
            role: auth_payload_1.Role.PLAYER,
        };
        const token = await this.generateToken(payload);
        await this.platformActivityService.create("Player logged in", "Player", log_event_1.LogType.info);
        return token;
    }
    async logInAdmin(user) {
        if (!user) {
            throw new auth_exceptions_1.UndefinedUserException();
        }
        let userInDb;
        try {
            userInDb = await this.adminsRepository.find({ email: user.email });
        }
        catch (error) {
            if (error instanceof entity_repository_1.NotFoundException)
                await this.platformActivityService.create("Admin tied to log with invalid credentials", user.email, log_event_1.LogType.info);
            throw new auth_exceptions_1.UserNotExistsException();
            throw error;
        }
        await this.validatePassword(user.password, userInDb.password);
        const payload = {
            username: user.email,
            userId: userInDb.id,
            gameId: userInDb.gameId || null,
            role: auth_payload_1.Role.ADMIN,
        };
        const token = await this.generateToken(payload);
        return token;
    }
    async verifyRequestForRoles(req, rolesPermitted) {
        const authorization = req.header("Authorization");
        const token = authorization ? authorization.replace("Bearer ", "") : null;
        if (!token) {
            this.platformActivityService.create("Someone tried to access a protected route without a token", "Anonymous", log_event_1.LogType.warn);
            throw new auth_exceptions_1.NoTokenPresentException();
        }
        let payload;
        try {
            payload = await (0, jsonwebtoken_1.verify)(token, publicKey);
        }
        catch (error) {
            this.platformActivityService.create("Someone tried to access a protected route with an invalid token", "Anonymous", log_event_1.LogType.warn);
            throw new auth_exceptions_1.InvalidTokenException();
        }
        if (!rolesPermitted.includes(payload.role)) {
            this.platformActivityService.create("Someone tried to access a protected route with not enough privileges", payload.role, log_event_1.LogType.warn);
            throw new auth_exceptions_1.NotEnoughPrivilegesException();
        }
        return payload;
    }
    async validatePassword(password, passwordInDb) {
        const passwordIsValid = await this.encryptionService.comparePassowrd(password, passwordInDb);
        if (!passwordIsValid) {
            throw new auth_exceptions_1.UserNotExistsException();
        }
    }
}
exports.AuthService = AuthService;
AuthService.tokenOptions = { expiresIn: "1h", algorithm: "RS256" };
//# sourceMappingURL=auth.service.js.map