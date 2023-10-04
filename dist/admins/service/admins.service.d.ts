import { Admin } from "./../entities/admins.entity";
import { AdminsServiceInterface } from "./admins.service.interface";
import { AdminsRepositoryInterface } from "./../repository/admins.repository.interface";
import { EncryptionServiceInterface } from "src/encryption/service/encryption.interface";
export declare class AdminsService implements AdminsServiceInterface {
    private readonly adminRepository;
    private readonly encryptionService;
    constructor(adminRepository: AdminsRepositoryInterface, encryptionService: EncryptionServiceInterface);
    createMainAdminIfNotExists(): Promise<void>;
    find(filters: any): Promise<Admin>;
    asignGameIdToAdmin(adminId: string, gameId: string): Promise<void>;
}
