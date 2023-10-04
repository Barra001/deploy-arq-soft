"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlataformActivitiesService = void 0;
const plataform_activities_entity_1 = require("../entities/plataform_activities.entity");
class PlataformActivitiesService {
    constructor(stream) {
        this.stream = stream;
    }
    create(content, userResponsible, type) {
        const plataformActivity = new plataform_activities_entity_1.PlataformActivity(type, content, userResponsible);
        this.stream.push(JSON.stringify(plataformActivity));
    }
}
exports.PlataformActivitiesService = PlataformActivitiesService;
//# sourceMappingURL=plataform_activities.service.js.map