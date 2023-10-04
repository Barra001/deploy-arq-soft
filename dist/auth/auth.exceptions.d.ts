import { AppException } from "./../exception_filter/app.exception";
export declare class UndefinedRoleException extends AppException {
    constructor();
}
export declare class UndefinedUserException extends AppException {
    constructor();
}
export declare class NotEnoughPrivilegesException extends AppException {
    constructor();
}
export declare class NoTokenPresentException extends AppException {
    constructor();
}
export declare class InvalidTokenException extends AppException {
    constructor();
}
export declare class UserNotExistsException extends AppException {
    constructor();
}
export declare class GameNotExistsException extends AppException {
    constructor();
}
