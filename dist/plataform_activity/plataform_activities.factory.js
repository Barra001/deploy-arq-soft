"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlataformActivitiesFactory = void 0;
const plataform_activities_service_1 = require("./service/plataform_activities.service");
class PlataformActivitiesFactory {
    static create(stream) {
        const plataformActivityService = new plataform_activities_service_1.PlataformActivitiesService(stream);
        return plataformActivityService;
    }
}
exports.PlataformActivitiesFactory = PlataformActivitiesFactory;
//# sourceMappingURL=plataform_activities.factory.js.map