"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogger = void 0;
class ActivityLogger {
    static getInstance() {
        if (!ActivityLogger.instance) {
            ActivityLogger.instance = new ActivityLogger();
        }
        return ActivityLogger.instance;
    }
}
exports.ActivityLogger = ActivityLogger;
ActivityLogger.instance = null;
//# sourceMappingURL=activityLogger.js.map