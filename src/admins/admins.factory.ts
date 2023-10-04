import { EncryptionServiceInterface } from "src/encryption/service/encryption.interface";
import { AdminsRepositoryInterface } from "./repository/admins.repository.interface";
import { AdminsService } from "./service/admins.service";
import { AdminsServiceInterface } from "./service/admins.service.interface";

export class AdminsFactory {
  static create(
    adminRepository: AdminsRepositoryInterface,
    encryptionService: EncryptionServiceInterface
  ): AdminsServiceInterface {
    const adminService = new AdminsService(adminRepository, encryptionService);
    return adminService;
  }
}
