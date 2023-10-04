import { PlataformActivitiesServiceInterface } from "./../plataform_activity/service/plataform_activities.service.interface";
export declare class RedisClient {
    private readonly platformActivityService;
    constructor(platformActivityService: PlataformActivitiesServiceInterface);
    private redis?;
    connect(): Promise<void>;
    storeDecisionInRedis(stockId: string, decision: string): Promise<void>;
    getDecisionFromRedis(stockId: string): Promise<string | null>;
    ping(): Promise<void>;
}
