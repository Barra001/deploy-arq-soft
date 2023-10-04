"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
class Pipeline {
    constructor(filters = []) {
        this.filters = filters;
    }
    use(filter) {
        this.filters.push(filter);
    }
    async run(input) {
        for (const aFilter of this.filters) {
            input = await aFilter(input);
        }
        return input;
    }
}
exports.Pipeline = Pipeline;
//# sourceMappingURL=pipeline.js.map