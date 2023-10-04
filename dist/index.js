"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_database_1 = require("./database/mongo.database");
const server_1 = require("./server");
const plataform_activities_factory_1 = require("./plataform_activity/plataform_activities.factory");
const stream_1 = require("stream");
const loggingWorker_1 = require("./plataform_activity/loggers/loggingWorker");
(async () => {
    const loggerService = new stream_1.Readable({
        read() {
            return;
        },
    });
    loggerService.setEncoding("utf8");
    loggerService.addListener("data", (data) => {
        void (0, loggingWorker_1.logWorker)(data);
    });
    await (0, mongo_database_1.connectToMongoDatabase)();
    const plataformActivityService = plataform_activities_factory_1.PlataformActivitiesFactory.create(loggerService);
    await (0, server_1.initServer)(plataformActivityService);
})();
//# sourceMappingURL=index.js.map