import { RedisClient } from "src/database/redis.database";
import { MonitoringServiceEntity } from "../entities/monitoring_service.entity";

export interface MonitoringServiceInterface {
    getStatus(redis: RedisClient): Promise<MonitoringServiceEntity>;
}
