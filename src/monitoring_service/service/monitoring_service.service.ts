import mongoose from "mongoose";
import { MonitoringServiceInterface } from "./monitoring_service.service.interface";
import { MonitoringServiceEntity } from "../entities/monitoring_service.entity";

export class MonitoringService implements MonitoringServiceInterface {
  async getStatus(): Promise<MonitoringServiceEntity> {
    const status = new MonitoringServiceEntity();
    status.status.ableToReceiveRequests = true;

    const bdStatus = await this.getBdStatus();
    if (bdStatus) {
      status.status.database.connected = true;
    } else {
      status.status.database.error = "Database not connected";
    }

    return status;
  }

  async getBdStatus(): Promise<boolean> {
    const status = await mongoose.connection.readyState.toString();

    if (status == "1") {
      return true;
    } else {
      return false;
    }
  }
}
