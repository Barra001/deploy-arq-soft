import { Request, Response } from "express";
import { TransactionServiceInterface } from "../service/transactions.service.interface";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
export declare class TransactionsController {
    private readonly transactionService;
    private readonly authService;
    constructor(transactionService: TransactionServiceInterface, authService: AuthServiceInterface);
    buy(req: Request, res: Response): Promise<void>;
    sell(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<void>;
    getVolume(req: Request, res: Response): Promise<void>;
}
