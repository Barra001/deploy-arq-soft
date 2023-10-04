"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const monitoring_service_entity_1 = require("../entities/monitoring_service.entity");
class MonitoringService {
    async getStatus() {
        const status = new monitoring_service_entity_1.MonitoringServiceEntity();
        status.status.ableToReceiveRequests = true;
        const bdStatus = await this.getBdStatus();
        if (bdStatus) {
            status.status.database.connected = true;
        }
        else {
            status.status.database.error = "Database not connected";
        }
        return status;
    }
    async getBdStatus() {
        const status = await mongoose_1.default.connection.readyState.toString();
        if (status == "1") {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.MonitoringService = MonitoringService;
//# sourceMappingURL=monitoring_service.service.js.map