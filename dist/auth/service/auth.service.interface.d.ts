import { AuthPayload, Role } from "../entities/auth.payload";
import { User } from "../entities/auth.entity";
export interface AuthServiceInterface {
    logInAdmin(user: User): Promise<string>;
    logInPlayer(user: User): Promise<string>;
    verifyRequestForRoles(req: Request, rolesPermitted: Role[]): Promise<AuthPayload>;
}
