"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsController = void 0;
class AdminsController {
    constructor(authService) {
        this.authService = authService;
    }
    async logIn(req, res) {
        const user = req.body;
        const token = await this.authService.logInAdmin(user);
        res.setHeader("Authorization", token);
        res.json({ message: "Login Successful" });
    }
}
exports.AdminsController = AdminsController;
//# sourceMappingURL=admins.controller.js.map