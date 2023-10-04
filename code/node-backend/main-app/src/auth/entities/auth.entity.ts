export class User {
  constructor(username: string, password: string, gameName: string) {
    this.email = username;
    this.password = password;
    this.gameName = gameName;
  }

  public email: string;
  public password: string;
  public gameName: string;
}
