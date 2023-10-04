import { Admin } from "../entities/admins.entity";

export interface AdminsServiceInterface {
  find(filters): Promise<Admin>;
  asignGameIdToAdmin(adminId: string, gameId: string): Promise<void>;
}
