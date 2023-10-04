import { Request, Response } from "express";
import { MonitoringServiceInterface } from "./../service/monitoring_service.service.interface";
export declare class MonitoringServiceController {
    private readonly monitoringService;
    constructor(monitoringService: MonitoringServiceInterface);
    getSystemStatus(req: Request, res: Response): Promise<void>;
}
