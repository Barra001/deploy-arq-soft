/// <reference types="node" />
import { PlataformActivitiesServiceInterface } from "./service/plataform_activities.service.interface";
import { Readable } from "stream";
export declare class PlataformActivitiesFactory {
    static create(stream: Readable): PlataformActivitiesServiceInterface;
}
