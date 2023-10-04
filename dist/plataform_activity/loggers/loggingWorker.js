"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWorker = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
async function logWorker(log) {
    dotenv_1.default.config();
    const newRelicLogEndpoint = process.env.NEW_RELIC_ENDPOINT;
    const plataformActivity = JSON.parse(log);
    const logLine = `user: ${plataformActivity.userResponsible} - log: ${plataformActivity.content}`;
    console.log(logLine);
    const headers = {
        "Content-Type": "application/json",
        "Api-Key": process.env.NEW_RELIC_LICENSE_KEY,
        "Accept-Encoding": "gzip, deflate, br",
    };
    await axios_1.default.post(newRelicLogEndpoint, JSON.stringify({
        timestamp: plataformActivity.datetime.toString(),
        message: logLine,
        logtype: plataformActivity.activityType,
        service: "main-app",
    }), { headers });
}
exports.logWorker = logWorker;
//# sourceMappingURL=loggingWorker.js.map