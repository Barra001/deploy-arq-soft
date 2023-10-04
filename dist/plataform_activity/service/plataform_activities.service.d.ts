/// <reference types="node" />
import { LogType } from "../entities/log-event";
import { PlataformActivitiesServiceInterface } from "./plataform_activities.service.interface";
import { Readable } from "stream";
export declare class PlataformActivitiesService implements PlataformActivitiesServiceInterface {
    private readonly stream;
    constructor(stream: Readable);
    create(content: string, userResponsible: string, type: LogType): void;
}
