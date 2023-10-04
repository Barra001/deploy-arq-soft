"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityRepository = exports.NotFoundException = void 0;
const mongoose_1 = require("mongoose");
const app_exception_1 = require("./../exception_filter/app.exception");
class NotFoundException extends app_exception_1.AppException {
    constructor() {
        super(404, "Element not Found");
    }
}
exports.NotFoundException = NotFoundException;
class EntityRepository {
    constructor(entityModel) {
        this.entityModel = entityModel;
    }
    async getAll(refs = []) {
        const query = this.entityModel.find();
        refs.forEach((ref) => query.populate(ref));
        return await query.exec();
    }
    async getCount() {
        return await this.entityModel.countDocuments({}).exec();
    }
    async getCountBy(groupBy) {
        const filter = "$" + groupBy;
        const query = this.entityModel.aggregate([
            {
                $group: {
                    _id: { [groupBy]: filter },
                    count: { $sum: 1 },
                },
            },
        ]);
        return await query.exec();
    }
    async findById(id, refs = []) {
        const filters = { _id: new mongoose_1.Types.ObjectId(id) };
        const query = this.entityModel.find(filters);
        refs.forEach((ref) => query.populate(ref));
        const result = await query.exec();
        if (result.length === 0) {
            throw new NotFoundException();
        }
        return result[0];
    }
    async find(filters = {}, refs = []) {
        const query = this.entityModel.find(filters);
        refs.forEach((ref) => query.populate(ref));
        const result = await query.exec();
        if (result.length === 0) {
            throw new NotFoundException();
        }
        return result[0];
    }
    async findAll(filters = {}, skip = 0, limit = Infinity, refs = []) {
        const query = this.entityModel.find(filters).skip(skip).limit(limit);
        refs.forEach((ref) => query.populate(ref));
        return await query.exec();
    }
    async exists(filters = {}, refs = []) {
        const query = this.entityModel.find(filters);
        refs.forEach((ref) => query.populate(ref));
        const result = await query.exec();
        return !(result.length === 0);
    }
    async save(document) {
        await document.save();
        return document;
    }
    async create(data) {
        const document = new this.entityModel(data);
        return await this.save(document);
    }
    async update(document) {
        return await this.save(document);
    }
    async delete(id) {
        const filters = { _id: new mongoose_1.Types.ObjectId(id) };
        await this.entityModel.deleteOne(filters).exec();
    }
}
exports.EntityRepository = EntityRepository;
//# sourceMappingURL=entity.repository.js.map