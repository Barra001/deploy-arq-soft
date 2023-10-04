export declare class AppException extends Error {
    constructor(httpStatusCode: number, message: string);
    httpStatusCode: number;
}
