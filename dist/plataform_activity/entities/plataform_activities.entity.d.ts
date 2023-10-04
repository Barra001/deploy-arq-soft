import { LogType } from "./log-event";
export declare class PlataformActivity {
    activityType: LogType;
    userResponsible: string;
    datetime: Date;
    content: string;
    constructor(logType: LogType, content: string, userResponsible: string);
}
