import { TransactionServiceInterface } from "./service/transactions.service.interface";
import { TransactionsRepository } from "./respository/transactions.repository";
import { StocksServiceInterface } from "./../stock/service/stocks.service.interface";
import { PlayersServiceInterface } from "./../player/service/players.service.interface";
import { PlataformActivitiesServiceInterface } from "./../plataform_activity/service/plataform_activities.service.interface";
export declare class TransactionsFactory {
    static create(transactionsRepository: TransactionsRepository, stocksService: StocksServiceInterface, playersService: PlayersServiceInterface, plataformActivitiesService: PlataformActivitiesServiceInterface): TransactionServiceInterface;
}
