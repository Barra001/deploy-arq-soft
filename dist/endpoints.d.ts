import { AppRouterWrapper } from "./router.wrapper";
import { PlataformActivitiesServiceInterface } from "./plataform_activity/service/plataform_activities.service.interface";
import { RedisClient } from "./database/redis.database";
export declare function initEndpoints(platformActivityService: PlataformActivitiesServiceInterface, redisClient: RedisClient): AppRouterWrapper;
