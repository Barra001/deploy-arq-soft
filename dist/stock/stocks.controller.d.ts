import { Request, Response } from "express";
import { StocksServiceInterface } from "./service/stocks.service.interface";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
export declare class StocksController {
    private readonly stocksService;
    private readonly authService;
    constructor(stocksService: StocksServiceInterface, authService: AuthServiceInterface);
    create(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    modify(req: Request, res: Response): Promise<void>;
}
