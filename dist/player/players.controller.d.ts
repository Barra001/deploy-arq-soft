import { Request, Response } from "express";
import { PlayersServiceInterface } from "./service/players.service.interface";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
export declare class PlayersController {
    private readonly playersService;
    private readonly authService;
    constructor(playersService: PlayersServiceInterface, authService: AuthServiceInterface);
    register(req: Request, res: Response): Promise<void>;
    logIn(req: Request, res: Response): Promise<void>;
    getPlayer(req: Request, res: Response): Promise<void>;
}
