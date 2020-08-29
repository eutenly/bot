import FetchQueue from "./FetchQueue";

export default function request(fetchQueue: FetchQueue, path: string, data?: object) {
    return new Promise((resolve) => {

        // Add to requests
        fetchQueue.requests.push({ path, data, resolve });

        // Process requests
        if (!fetchQueue.processingRequests) fetchQueue.processRequests();
    });
}