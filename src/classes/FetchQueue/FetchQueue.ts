import Client from "../Client/Client";
import { RequestOptions } from "../Client/fetch";
import RateLimit from "../common/RateLimit";
import processRequests from "./processRequests";
import request from "./request";

export interface RequestData {
    options: RequestOptions;
    resolve: Function;
    reject: Function;
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
    request = (path: string, options?: object, apiVersion?: number): Promise<any> => request(this, path, options, apiVersion);

    // Process requests
    processRequests = () => processRequests(this);
}