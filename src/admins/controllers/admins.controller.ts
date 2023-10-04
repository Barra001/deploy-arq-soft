import { Request, Response } from "express";
import { User } from "src/auth/entities/auth.entity";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";

export class AdminsController {
  constructor(private readonly authService: AuthServiceInterface) {}

  async logIn(req: Request, res: Response): Promise<void> {
    const user: User = req.body;
    const token = await this.authService.logInAdmin(user);
    res.setHeader("Authorization", token);
    res.json({ message: "Login Successful" });
  }
}
