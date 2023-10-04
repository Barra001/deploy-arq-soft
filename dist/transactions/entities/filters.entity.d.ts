export declare class Filters {
    startDate?: Date;
    endDate?: Date;
    stockCode?: string;
    skip?: number;
    limit?: number;
    playerId?: string;
    date?: object;
    gameId?: string;
    constructor(startDate?: Date, endDate?: Date, stockCode?: string, skip?: number, limit?: number, playerId?: string, date?: object, gameId?: string);
    getValidFilters(): Partial<Filters>;
}
