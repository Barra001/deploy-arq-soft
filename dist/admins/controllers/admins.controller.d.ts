import { Request, Response } from "express";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
export declare class AdminsController {
    private readonly authService;
    constructor(authService: AuthServiceInterface);
    logIn(req: Request, res: Response): Promise<void>;
}
