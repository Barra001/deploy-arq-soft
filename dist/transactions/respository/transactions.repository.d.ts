import { Model } from "mongoose";
import { EntityRepository } from "../../database/entity.repository";
import { Transaction } from "../entities/transactions.entity";
import { TransactionsRepositoryInterface } from "./transactions.repository.interface";
export declare class TransactionsRepository extends EntityRepository<Transaction> implements TransactionsRepositoryInterface {
    constructor(TransactionModel: Model<Transaction>);
}
