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
import { ShareInteraction } from "./shareInteraction.entity";
export declare class Transaction extends Document {
    id: Types.ObjectId;
    stockCode: string;
    quantity: number;
    playerId: string;
    gameId: string;
    date: Date;
    type: ShareInteraction;
    stockValueOnTransaction: number;
    constructor(stockCode: string, stockQuanity: number, playerId: string, gameId: string, type: ShareInteraction, date: Date, stockValueOnTransaction: number);
}
export declare const TransactionSchema: Schema<Transaction, import("mongoose").Model<Transaction, any, any, any, Document<unknown, any, Transaction> & Transaction & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transaction, Document<unknown, {}, Transaction> & Transaction & {
    _id: Types.ObjectId;
}>;
export declare const TransactionModel: import("mongoose").Model<Transaction, {}, {}, {}, Document<unknown, {}, Transaction> & Transaction & {
    _id: Types.ObjectId;
}, any>;
