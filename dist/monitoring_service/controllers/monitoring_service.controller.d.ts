import { Request, Response } from "express";
import { MonitoringServiceInterface } from "./../service/monitoring_service.service.interface";
import { RedisClient } from "src/database/redis.database";
export declare class MonitoringServiceController {
    private readonly monitoringService;
    private readonly redisClient;
    constructor(monitoringService: MonitoringServiceInterface, redisClient: RedisClient);
    getSystemStatus(req: Request, res: Response): Promise<void>;
}
