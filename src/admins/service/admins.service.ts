import { Admin } from "./../entities/admins.entity";

import { AdminsServiceInterface } from "./admins.service.interface";
import { AdminsRepositoryInterface } from "./../repository/admins.repository.interface";
import { EncryptionServiceInterface } from "src/encryption/service/encryption.interface";

export class AdminsService implements AdminsServiceInterface {
  constructor(
    private readonly adminRepository: AdminsRepositoryInterface,
    private readonly encryptionService: EncryptionServiceInterface
  ) {
    void this.createMainAdminIfNotExists();
  }
  // create admin if not exists
  async createMainAdminIfNotExists(): Promise<void> {
    try {
      await this.adminRepository.find({ email: "admin@ort.com" });
    } catch (e) {
      const hashedPassword = await this.encryptionService.hashPassword(
        "Password1"
      );
      const admin = Admin.create("admin", hashedPassword, "admin@ort.com", "");
      await this.adminRepository.create(admin);
    }
  }

  async find(filters): Promise<Admin> {
    return await this.adminRepository.find(filters);
  }

  async asignGameIdToAdmin(adminId: string, gameId: string): Promise<void> {
    await this.find({ _id: adminId }).then(async (admin) => {
      admin.gameId = gameId;
      await this.adminRepository.update(admin);
    });
  }
}
