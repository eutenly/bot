import FetchQueue from "./FetchQueue";

export default function request(fetchQueue: FetchQueue, path: string, options?: object, apiVersion?: number) {
    return new Promise((resolve, reject) => {

        // Add to requests
        fetchQueue.requests.push({ options: { path, apiVersion, options }, resolve, reject });

        // Process requests
        if (!fetchQueue.processingRequests) fetchQueue.processRequests();
    });
}