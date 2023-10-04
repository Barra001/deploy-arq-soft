import { AppException } from "./../exception_filter/app.exception";
export declare class UnauthorizedModificationOfStock extends AppException {
    constructor();
}
export declare class StockHasActiveTransactionsException extends AppException {
    constructor();
}
export declare class StockAlreadyExistsException extends AppException {
    constructor();
}
export declare class StockInvalidPrice extends AppException {
    constructor();
}
