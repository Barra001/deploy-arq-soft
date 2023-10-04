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
export declare class News extends Document {
    id: Types.ObjectId;
    title: string;
    date: Date;
    content: string;
    stockAssociated: string[];
    gameId: string;
    constructor(title: string, content: string, gameId: string);
    static create(title: string, date: Date, content: string, stockAssociated: string[], gameId: string): News;
}
export declare const NewsSchema: Schema<News, import("mongoose").Model<News, any, any, any, Document<unknown, any, News> & News & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, News, Document<unknown, {}, News> & News & {
    _id: Types.ObjectId;
}>;
export declare const NewsModel: import("mongoose").Model<News, {}, {}, {}, Document<unknown, {}, News> & News & {
    _id: Types.ObjectId;
}, any>;
