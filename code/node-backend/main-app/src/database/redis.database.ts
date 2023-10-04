import Redis from "ioredis";
import dotenv from "dotenv";
import { PlataformActivitiesServiceInterface } from "./../plataform_activity/service/plataform_activities.service.interface";
import { LogType } from "./../plataform_activity/entities/log-event";

export class RedisClient {
  constructor(
    private readonly platformActivityService: PlataformActivitiesServiceInterface
  ) {}

  private redis?: Redis;

  public async connect(): Promise<void> {
    dotenv.config();
    console.log("Connecting to: " + process.env.REDIS_URI);
    const redis = new Redis(process.env.REDIS_URI);
    redis.on("error", async (error) => {
      console.error("Redis Error:", error);
      await this.platformActivityService.create(
        "Error connecting to Redis",
        "System",
        LogType.error
      );
    });

    await redis.ping();

    console.log("Connected to Redis");

    this.redis = redis;
  }

  public async storeDecisionInRedis(
    stockId: string,
    decision: string
  ): Promise<void> {
    await this.redis.set(stockId, decision, async (err) => {
      if (err) {
        await this.platformActivityService.create(
          "Error setting key in Redis",
          "System",
          LogType.error
        );
      } else {
        await this.redis.expire(stockId, process.env.REDIS_EXPIRATION_TIME);
      }
    });
  }

  public async getDecisionFromRedis(stockId: string): Promise<string | null> {
    try {
      const reply = await this.redis.get(stockId);
      return reply;
    } catch (err) {
      await this.platformActivityService.create(
        "Error retrieving key in Redis",
        "System",
        LogType.error
      );
      return null;
    }
  }

  public async ping(): Promise<void> {
    await this.redis.ping();
  }
}
