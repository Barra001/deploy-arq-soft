import { Model } from "mongoose";
import { EntityRepository } from "../../database/entity.repository";
import { Stock } from "../entities/stock.entity";
import { StocksRepositoryInterface } from "./stocks.repository.interface";
export declare class StocksRepository extends EntityRepository<Stock> implements StocksRepositoryInterface {
    constructor(StockModel: Model<Stock>);
}
