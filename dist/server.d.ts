import { PlataformActivitiesServiceInterface } from "./plataform_activity/service/plataform_activities.service.interface";
import { RedisClient } from "./database/redis.database";
export declare function initServer(platformActivitiesService: PlataformActivitiesServiceInterface, redisClient: RedisClient): Promise<void>;
