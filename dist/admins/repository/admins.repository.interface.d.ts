import { Admin } from "../entities/admins.entity";
export interface AdminsRepositoryInterface {
    find(filters: any): Promise<Admin>;
    update(admin: Admin): Promise<Admin>;
    create(admin: Admin): Promise<Admin>;
}
