
export class UserInformation {
  public gameId: string;
  public playerId: string;
  public role: string;

  constructor(gameId: string, playerId: string, role: string) {
    this.gameId = gameId;
    this.playerId = playerId;
    this.role = role;
  }
}
