import { EncryptionServiceInterface } from "src/encryption/service/encryption.interface";
import { AdminsRepositoryInterface } from "./repository/admins.repository.interface";
import { AdminsServiceInterface } from "./service/admins.service.interface";
export declare class AdminsFactory {
    static create(adminRepository: AdminsRepositoryInterface, encryptionService: EncryptionServiceInterface): AdminsServiceInterface;
}
