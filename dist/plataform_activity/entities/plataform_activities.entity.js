"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlataformActivity = void 0;
class PlataformActivity {
    constructor(logType, content, userResponsible) {
        this.activityType = logType;
        this.userResponsible = userResponsible;
        this.datetime = new Date();
        this.content = content;
    }
}
exports.PlataformActivity = PlataformActivity;
//# sourceMappingURL=plataform_activities.entity.js.map