import { AppException } from "./../exception_filter/app.exception";
export declare class UnsufficientFundsException extends AppException {
    constructor();
}
export declare class InvalidStockCodeException extends AppException {
    constructor();
}
export declare class InsufficientStockToSellException extends AppException {
    constructor();
}
export declare class InsufficientSharesToBuyException extends AppException {
    constructor();
}
