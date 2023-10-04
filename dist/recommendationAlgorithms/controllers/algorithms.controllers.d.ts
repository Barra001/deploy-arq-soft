import { Request, Response } from "express";
import { AuthServiceInterface } from "./../../auth/service/auth.service.interface";
import { AlgorithmsServicesInterface } from "./../services/algorithms.service.interface";
export declare class AlgorithmsController {
    private readonly algorithmsService;
    private readonly authService;
    constructor(algorithmsService: AlgorithmsServicesInterface, authService: AuthServiceInterface);
    algorithmPrediction(req: Request, res: Response): Promise<void>;
}
