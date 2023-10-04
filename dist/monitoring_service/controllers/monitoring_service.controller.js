"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringServiceController = void 0;
class MonitoringServiceController {
    constructor(monitoringService, redisClient) {
        this.monitoringService = monitoringService;
        this.redisClient = redisClient;
    }
    async getSystemStatus(req, res) {
        const status = await this.monitoringService.getStatus(this.redisClient);
        res.send(status);
    }
}
exports.MonitoringServiceController = MonitoringServiceController;
//# sourceMappingURL=monitoring_service.controller.js.map