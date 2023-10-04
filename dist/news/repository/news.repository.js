"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRepository = void 0;
const entity_repository_1 = require("../../database/entity.repository");
class NewsRepository extends entity_repository_1.EntityRepository {
    constructor(NewsModel) {
        super(NewsModel);
    }
}
exports.NewsRepository = NewsRepository;
//# sourceMappingURL=news.repository.js.map