"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filters = void 0;
class Filters {
    constructor(startDate, endDate, stockCode, skip, limit, playerId, date, gameId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.stockCode = stockCode;
        this.skip = skip;
        this.limit = limit;
        this.playerId = playerId;
        this.date = date;
        this.gameId = gameId;
    }
    getValidFilters() {
        return Object.entries(this).reduce((acc, [key, value]) => {
            if (value != null) {
                acc[key] = value;
            }
            return acc;
        }, {});
    }
}
exports.Filters = Filters;
//# sourceMappingURL=filters.entity.js.map