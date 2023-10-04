import { MonitoringServiceEntity } from "../entities/monitoring_service.entity";

export interface MonitoringServiceInterface {
  getStatus(): Promise<MonitoringServiceEntity>;
}
