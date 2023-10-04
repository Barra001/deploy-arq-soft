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
export declare class Admin extends Document {
    id: Types.ObjectId;
    name: string;
    password: string;
    email: string;
    gameId: string;
    constructor(userName: string, password: string, email: string, gameId: string);
    static create(userName: string, password: string, email: string, gameId: string): Admin;
}
export declare const AdminSchema: Schema<Admin, import("mongoose").Model<Admin, any, any, any, Document<unknown, any, Admin> & Admin & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Admin, Document<unknown, {}, Admin> & Admin & {
    _id: Types.ObjectId;
}>;
export declare const AdminModel: import("mongoose").Model<Admin, {}, {}, {}, Document<unknown, {}, Admin> & Admin & {
    _id: Types.ObjectId;
}, any>;
