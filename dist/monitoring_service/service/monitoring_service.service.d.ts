import { MonitoringServiceInterface } from "./monitoring_service.service.interface";
import { MonitoringServiceEntity } from "../entities/monitoring_service.entity";
export declare class MonitoringService implements MonitoringServiceInterface {
    getStatus(): Promise<MonitoringServiceEntity>;
    getBdStatus(): Promise<boolean>;
}
