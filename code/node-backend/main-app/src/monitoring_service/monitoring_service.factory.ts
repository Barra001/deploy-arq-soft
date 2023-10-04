import { MonitoringServiceInterface } from "./service/monitoring_service.service.interface";

import { MonitoringService } from "./service/monitoring_service.service";

export class MonitoringServiceFactory {
    static create(

    ): MonitoringServiceInterface {
        const monitoringService = new MonitoringService(


        );
        return monitoringService;
    }
}
