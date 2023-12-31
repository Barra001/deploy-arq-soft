import { LogType } from "./log-event";

export class PlataformActivity {
  public activityType: LogType;

  public userResponsible: string;

  public datetime: Date;

  public content: string;

  constructor(logType: LogType, content: string, userResponsible: string) {
    this.activityType = logType;
    this.userResponsible = userResponsible;
    this.datetime = new Date();
    this.content = content;
  }
}
