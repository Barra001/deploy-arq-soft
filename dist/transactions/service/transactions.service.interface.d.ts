import { Filters } from "../entities/filters.entity";
import { Transaction } from "../entities/transactions.entity";
import { UserInformation } from "../entities/userInformation.entity";
export interface TransactionServiceInterface {
    buy(transaction: Transaction): Promise<Transaction>;
    sell(transaction: Transaction): Promise<Transaction>;
    get(userInfo: UserInformation, filters: Filters): Promise<Transaction[]>;
    calculateVolume(stockCode: string, gameId: string): Promise<number>;
    findAll(filters: {
        gameId: string;
        stockCode: string;
        limit: number;
    }): Promise<Transaction[]>;
}
