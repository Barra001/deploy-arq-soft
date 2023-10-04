"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringServiceEntity = void 0;
class MonitoringServiceEntity {
    constructor() {
        this.status = {
            database: {
                connected: false,
                error: null,
            },
            ableToReceiveRequests: false,
        };
    }
}
exports.MonitoringServiceEntity = MonitoringServiceEntity;
//# sourceMappingURL=monitoring_service.entity.js.map