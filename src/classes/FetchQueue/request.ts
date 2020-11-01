import FetchQueue from "./FetchQueue";

export default function request(fetchQueue: FetchQueue, path: string, data?: object) {
    return new Promise((resolve, reject) => {

        // Add to requests
        fetchQueue.requests.push({ path, data, resolve, reject });

        // Process requests
        if (!fetchQueue.processingRequests) fetchQueue.processRequests();
    });
}