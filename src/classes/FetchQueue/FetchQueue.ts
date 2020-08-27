import Client from "../Client/Client";
import RateLimit from "../common/RateLimit";
import processRequests from "./processRequests";
import request from "./request";

export interface RequestData {
    path: string;
    data: object;
    resolve: Function;
}

export default class FetchQueue {

    // The client
    client: Client;

    // Data about the fetch queue
    requests: RequestData[];
    rateLimit?: RateLimit;
    processingRequests: boolean;

    // Constructor
    constructor(client: Client) {

        // Set data
        this.client = client;

        this.requests = [];
        this.processingRequests = false;
    }

    // Request data to be fetched
    request = (path: string, data: object): Promise<any> => request(this, path, data);

    // Process requests
    processRequests = () => processRequests(this);
}