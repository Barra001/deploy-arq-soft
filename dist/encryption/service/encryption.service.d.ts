import { EncryptionServiceInterface } from "./encryption.interface";
export declare class EncryptionService implements EncryptionServiceInterface {
    hashPassword(password: string): Promise<string>;
    comparePassowrd(password: string, hash: string): Promise<boolean>;
}
