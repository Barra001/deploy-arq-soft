
export class MonitoringServiceEntity {

    public status: {
        database: {
            connected: boolean;
            error: string;
        };
        ableToReceiveRequests: boolean; //to do: implement
        redis: {
            connected: boolean;
            error: string;
        };
    };

    constructor() {
        this.status = {
            database: {
                connected: false,
                error: null,
            },
            ableToReceiveRequests: false,
            redis: {
                connected: false,
                error: null,
            },
        };

    }
}



