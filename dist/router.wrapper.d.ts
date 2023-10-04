import { Router } from "express";
import { Request, Response } from "express";
import { PlataformActivitiesServiceInterface } from "./plataform_activity/service/plataform_activities.service.interface";
type ExceptionFilterFunction = (error: Error, req: Request, res: Response, plataformActivity: PlataformActivitiesServiceInterface) => void;
export declare class MulterField {
    constructor(name: string, maxCount: number);
    name: string;
    maxCount: number;
}
type EndPointFunction = (req: Request, res: Response) => Promise<void>;
export declare class AppRouterWrapper {
    private readonly plataformActivity;
    constructor(exceptionFilterFunction: ExceptionFilterFunction, plataformActivity: PlataformActivitiesServiceInterface);
    private exceptionFilterFunction;
    private multer;
    router: Router;
    private static filesLimits;
    private createFields;
    post(path: string, endPointFunction: EndPointFunction, files?: MulterField[]): void;
    get(path: string, endPointFunction: EndPointFunction): void;
    put(path: string, endPointFunction: EndPointFunction): void;
    delete(path: string, endPointFunction: EndPointFunction): void;
}
export {};
