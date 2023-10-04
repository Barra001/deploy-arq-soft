import { AnyKeys, AnyObject } from "mongoose";
import { Transaction } from "../entities/transactions.entity";
export interface TransactionsRepositoryInterface {
    create(data: AnyKeys<Transaction> & AnyObject): Promise<Transaction>;
    find(data: AnyKeys<Transaction> & AnyObject): Promise<Transaction>;
    findAll(data: AnyKeys<Transaction> & AnyObject, skip?: any, limit?: any): Promise<Transaction[]>;
}
