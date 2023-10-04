export class MonitoringServiceEntity {
  public status: {
    database: {
      connected: boolean;
      error: string;
    };
    ableToReceiveRequests: boolean; //to do: implement
  };

  constructor() {
    this.status = {
      database: {
        connected: false,
        error: null,
      },
      ableToReceiveRequests: false,
    };
  }
}
