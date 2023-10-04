import { Request, Response } from "express";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
export declare class AppExceptionFilter {
    static catch(error: Error, req: Request, res: Response, plataformActivity: PlataformActivitiesServiceInterface): void;
}
