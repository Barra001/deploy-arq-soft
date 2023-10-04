"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
const log_event_1 = require("./../plataform_activity/entities/log-event");
class RedisClient {
    constructor(platformActivityService) {
        this.platformActivityService = platformActivityService;
    }
    async connect() {
        dotenv_1.default.config();
        console.log("Connecting to: " + process.env.REDIS_URI);
        const redis = new ioredis_1.default(process.env.REDIS_URI);
        redis.on("error", async (error) => {
            console.error("Redis Error:", error);
            await this.platformActivityService.create("Error connecting to Redis", "System", log_event_1.LogType.error);
        });
        await redis.ping();
        console.log("Connected to Redis");
        this.redis = redis;
    }
    async storeDecisionInRedis(stockId, decision) {
        await this.redis.set(stockId, decision, async (err) => {
            if (err) {
                await this.platformActivityService.create("Error setting key in Redis", "System", log_event_1.LogType.error);
            }
            else {
                await this.redis.expire(stockId, process.env.REDIS_EXPIRATION_TIME);
            }
        });
    }
    async getDecisionFromRedis(stockId) {
        try {
            const reply = await this.redis.get(stockId);
            return reply;
        }
        catch (err) {
            await this.platformActivityService.create("Error retrieving key in Redis", "System", log_event_1.LogType.error);
            return null;
        }
    }
    async ping() {
        await this.redis.ping();
    }
}
exports.RedisClient = RedisClient;
//# sourceMappingURL=redis.database.js.map