import { AppException } from "../exception_filter/app.exception";
export declare class PlayerAlreadyExistsException extends AppException {
    constructor();
}
export declare class PlayerInvalidName extends AppException {
    constructor();
}
export declare class PlayerInvalidPassword extends AppException {
    constructor();
}
export declare class PlayerInvalidMail extends AppException {
    constructor();
}
export declare class GameNotFoundException extends AppException {
    constructor();
}
