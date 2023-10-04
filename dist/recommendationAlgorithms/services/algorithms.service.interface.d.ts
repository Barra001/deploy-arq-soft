export interface AlgorithmsServicesInterface {
    getDecision(stockCode: string, gameId: string): Promise<string>;
}
