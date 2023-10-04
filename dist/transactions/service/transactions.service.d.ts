import { Transaction } from "../entities/transactions.entity";
import { TransactionServiceInterface } from "./transactions.service.interface";
import { TransactionsRepositoryInterface } from "../respository/transactions.repository.interface";
import { StocksServiceInterface } from "src/stock/service/stocks.service.interface";
import { PlayersServiceInterface } from "src/player/service/players.service.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
import { UserInformation } from "../entities/userInformation.entity";
import { Filters } from "../entities/filters.entity";
export declare class TransactionService implements TransactionServiceInterface {
    private readonly transactionRepository;
    private readonly stocksService;
    private readonly playersService;
    private readonly platformActivitiesService;
    constructor(transactionRepository: TransactionsRepositoryInterface, stocksService: StocksServiceInterface, playersService: PlayersServiceInterface, platformActivitiesService: PlataformActivitiesServiceInterface);
    get(userInfo: UserInformation, filters: Filters): Promise<Transaction[]>;
    calculateVolume(stockCode: string, gameId: string): Promise<number>;
    buy(transaction: Transaction): Promise<Transaction>;
    sell(transaction: Transaction): Promise<Transaction>;
    findAll(filters: {
        gameId: string;
        stockCode: string;
        limit: number;
    }): Promise<Transaction[]>;
    private validatePlayerBalance;
    private validateStockSharesQuanitity;
    private validateExistentStock;
    private updatePlayerBalance;
}
