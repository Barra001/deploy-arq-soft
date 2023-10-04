/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Types, Document, Schema } from "mongoose";
import { HistoricalValue } from "./historicalValue.entity";
export declare class Stock extends Document {
    id: Types.ObjectId;
    code: string;
    name: string;
    description: string;
    unitValue: number;
    historicalValues: HistoricalValue[];
    gameId: string;
    availableStocksOnMarket: number;
    totalStocksOnMarket: number;
    hasTransactions: boolean;
    constructor(code: string, name: string, description: string, unitValue: number, gameId: string, historicalValues: HistoricalValue[], availableStocksOnMarket: number, totalStocksOnMarket: number, hasTransactions: boolean);
    static create(code: string, name: string, description: string, unitValue: number, gameId: string, historicalValues: HistoricalValue[], availableStocksOnMarket: number, totalStocksOnMarket: number, hasTransactions: boolean): Stock;
}
export declare const StockSchema: Schema<Stock, import("mongoose").Model<Stock, any, any, any, Document<unknown, any, Stock> & Stock & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Stock, Document<unknown, {}, Stock> & Stock & {
    _id: Types.ObjectId;
}>;
export declare const StockModel: import("mongoose").Model<Stock, {}, {}, {}, Document<unknown, {}, Stock> & Stock & {
    _id: Types.ObjectId;
}, any>;
