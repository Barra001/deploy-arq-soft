export enum Role {
  ADMIN = "ADMIN",
  PLAYER = "PLAYER",
}
export class AuthPayload {
  constructor(username: string, gameId: string, userId: string, role: Role) {
    this.username = username;
    this.gameId = gameId;
    this.userId = userId;
    this.role = role;
  }
  public role: Role;
  public username: string;
  public gameId: string;
  public userId: string;
}
