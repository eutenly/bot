import Client from "../Client/Client";
import RateLimit from "../common/RateLimit";
import processRequests from "./processRequests";
import request from "./request";

export interface RequestData {
    data: object;
    resolve: Function;
}

export default class FetchQueue {

    // The client
    client: Client;

    // Data about the fetch queue
    path: string;
    requests: RequestData[];
    rateLimit?: RateLimit;
    processingRequests: boolean;

    // Constructor
    constructor(client: Client, path: string) {

        // Set data
        this.client = client;

        this.path = path;
        this.requests = [];
        this.processingRequests = false;
    }

    // Request data to be fetched
    request = (data: object): Promise<any> => request(this, data);

    // Process requests
    processRequests = () => processRequests(this);
}