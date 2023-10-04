"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringServiceFactory = void 0;
const monitoring_service_service_1 = require("./service/monitoring_service.service");
class MonitoringServiceFactory {
    static create() {
        const monitoringService = new monitoring_service_service_1.MonitoringService();
        return monitoringService;
    }
}
exports.MonitoringServiceFactory = MonitoringServiceFactory;
//# sourceMappingURL=monitoring_service.factory.js.map