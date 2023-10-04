import { Model } from "mongoose";
import { EntityRepository } from "../../database/entity.repository";
import { AdminsRepositoryInterface } from "./admins.repository.interface";
import { Admin } from "../entities/admins.entity";
export declare class AdminsRepository extends EntityRepository<Admin> implements AdminsRepositoryInterface {
    constructor(playerModel: Model<Admin>);
}
