export declare class MonitoringServiceEntity {
    status: {
        database: {
            connected: boolean;
            error: string;
        };
        ableToReceiveRequests: boolean;
        redis: {
            connected: boolean;
            error: string;
        };
    };
    constructor();
}
