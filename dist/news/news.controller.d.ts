import { Request, Response } from "express";
import { NewsServiceInterface } from "./service/news.service.interface";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
export declare class NewsController {
    private readonly newsService;
    private readonly authService;
    constructor(newsService: NewsServiceInterface, authService: AuthServiceInterface);
    create(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    getFromCode(req: Request, res: Response): Promise<void>;
}
