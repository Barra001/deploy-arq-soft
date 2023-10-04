import { Types, Document, Schema, model } from "mongoose";

export class Admin extends Document {
  public id: Types.ObjectId;
  public name: string;
  public password: string;
  public email: string;
  public gameId: string;

  constructor(
    userName: string,
    password: string,
    email: string,
    gameId: string
  ) {
    super();
    this.name = userName;
    this.password = password;
    this.email = email;
    this.gameId = gameId;
  }

  static create(
    userName: string,
    password: string,
    email: string,
    gameId: string
  ): Admin {
    return {
      name: userName,
      password: password,
      email: email,
      gameId: gameId,
    } as Admin;
  }
}

export const AdminSchema = new Schema<Admin>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  gameId: { type: String },
});

export const AdminModel = model<Admin>("Admin", AdminSchema);
