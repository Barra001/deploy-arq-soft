export declare enum Role {
    ADMIN = "ADMIN",
    PLAYER = "PLAYER"
}
export declare class AuthPayload {
    constructor(username: string, gameId: string, userId: string, role: Role);
    role: Role;
    username: string;
    gameId: string;
    userId: string;
}
