"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringServiceController = void 0;
class MonitoringServiceController {
    constructor(monitoringService) {
        this.monitoringService = monitoringService;
    }
    async getSystemStatus(req, res) {
        const status = await this.monitoringService.getStatus();
        res.send(status);
    }
}
exports.MonitoringServiceController = MonitoringServiceController;
//# sourceMappingURL=monitoring_service.controller.js.map