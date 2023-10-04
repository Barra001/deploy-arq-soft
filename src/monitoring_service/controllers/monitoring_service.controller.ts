import { Request, Response } from "express";

import { MonitoringServiceInterface } from "./../service/monitoring_service.service.interface";

import { RedisClient } from "src/database/redis.database";


export class MonitoringServiceController {
    constructor(
        private readonly monitoringService: MonitoringServiceInterface,
        private readonly redisClient: RedisClient

    ) { }

    async getSystemStatus(req: Request, res: Response): Promise<void> {
        const status = await this.monitoringService.getStatus(
            this.redisClient);
        res.send(status);
    }
}
