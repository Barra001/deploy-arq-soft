import { MonitoringServiceInterface } from "./monitoring_service.service.interface";
import { MonitoringServiceEntity } from '../entities/monitoring_service.entity';
import { RedisClient } from 'src/database/redis.database';
export declare class MonitoringService implements MonitoringServiceInterface {
    getStatus(redis: RedisClient): Promise<MonitoringServiceEntity>;
    getBdStatus(): Promise<boolean>;
    getRedisStatus(redis: RedisClient): Promise<boolean>;
}
