import { Document, Model, AnyKeys, AnyObject } from "mongoose";
import { AppException } from "./../exception_filter/app.exception";
export declare class NotFoundException extends AppException {
    constructor();
}
export declare abstract class EntityRepository<T extends Document> {
    protected readonly entityModel: Model<T>;
    constructor(entityModel: Model<T>);
    getAll(refs?: string[]): Promise<T[]>;
    getCount(): Promise<number>;
    getCountBy(groupBy: string): Promise<T[]>;
    findById(id: string, refs?: string[]): Promise<T>;
    find(filters?: {}, refs?: string[]): Promise<T>;
    findAll(filters?: {}, skip?: number, limit?: number, refs?: string[]): Promise<T[]>;
    exists(filters?: {}, refs?: string[]): Promise<boolean>;
    save(document: T): Promise<T>;
    create(data: AnyKeys<T> & AnyObject): Promise<T>;
    update(document: T): Promise<T>;
    delete(id: string): Promise<void>;
}
