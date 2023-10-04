import mongoose from 'mongoose';
import { MonitoringServiceInterface } from "./monitoring_service.service.interface";
import { MonitoringServiceEntity } from '../entities/monitoring_service.entity';
import { RedisClient } from 'src/database/redis.database';

export class MonitoringService implements MonitoringServiceInterface {



    async getStatus(redis: RedisClient): Promise<MonitoringServiceEntity> {
        const status = new MonitoringServiceEntity();
        status.status.ableToReceiveRequests = true;

        const bdStatus = await this.getBdStatus();
        const redisStatus = await this.getRedisStatus(redis);
        if (bdStatus) {
            status.status.database.connected = true;

        } else {
            status.status.database.error = "Database not connected";
        }

        if (redisStatus) {
            status.status.redis.connected = true;

        } else {
            status.status.redis.error = "Redis not connected";
        }
        return status;
    }


    async getBdStatus(): Promise<boolean> {

        const status = await mongoose.connection.readyState.toString();

        if (status == "1") {
            return true;
        }
        else {
            return false;
        }

    }

    async getRedisStatus(redis: RedisClient): Promise<boolean> {

        try {
            await redis.ping();
            return true;
        } catch (error) {
            return false;
        }
    }
}