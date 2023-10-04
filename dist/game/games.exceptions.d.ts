import { AppException } from "../exception_filter/app.exception";
export declare class GameAlreadyExistsException extends AppException {
    constructor();
}
export declare class GameInvalidName extends AppException {
    constructor();
}
export declare class GameInvalidCode extends AppException {
    constructor();
}
export declare class GameInconsistentDates extends AppException {
    constructor();
}
export declare class GameInsertDates extends AppException {
    constructor();
}
