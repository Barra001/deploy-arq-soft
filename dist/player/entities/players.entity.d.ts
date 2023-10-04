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
import { StockQuantity } from "./../../stock/entities/stockQuantity";
export declare class Player extends Document {
    id: Types.ObjectId;
    name: string;
    password: string;
    email: string;
    gameId: string;
    balance: number;
    portfolio: StockQuantity[];
    constructor(userName: string, password: string, email: string, gameId: string, balance: number);
}
export declare const PlayerSchema: Schema<Player, import("mongoose").Model<Player, any, any, any, Document<unknown, any, Player> & Player & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Player, Document<unknown, {}, Player> & Player & {
    _id: Types.ObjectId;
}>;
export declare const PlayerModel: import("mongoose").Model<Player, {}, {}, {}, Document<unknown, {}, Player> & Player & {
    _id: Types.ObjectId;
}, any>;
