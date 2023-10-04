
export class Filters {
  public startDate?: Date;
  public endDate?: Date;
  public stockCode?: string;
  public skip?: number;
  public limit?: number;
  public playerId?: string;
  public date?: object;
  public gameId?: string;

  constructor(
    startDate?: Date,
    endDate?: Date,
    stockCode?: string,
    skip?: number,
    limit?: number,
    playerId?: string,
    date?: object,
    gameId?: string
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.stockCode = stockCode;
    this.skip = skip;
    this.limit = limit;
    this.playerId = playerId;
    this.date = date;
    this.gameId = gameId;
  }

  public getValidFilters(): Partial<Filters> {
    return Object.entries(this).reduce((acc, [key, value]) => {
      if (value != null) {
        acc[key] = value;
      }
      return acc;
    }, {} as Partial<Filters>);
  }
}

