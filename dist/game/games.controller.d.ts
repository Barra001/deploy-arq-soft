import { Request, Response } from "express";
import { GamesServiceInterface } from "./service/games.service.interface";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
export declare class GamesController {
    private readonly gamesService;
    private readonly authService;
    constructor(gamesService: GamesServiceInterface, authService: AuthServiceInterface);
    create(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
}
