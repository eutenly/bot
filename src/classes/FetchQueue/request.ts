import FetchQueue from "./FetchQueue";

export default async function request(fetchQueue: FetchQueue, data: object) {
    return new Promise((resolve) => {

        // Add to requests
        fetchQueue.requests.push({ data, resolve });

        // Process requests
        if (!fetchQueue.processingRequests) fetchQueue.processRequests();
    });
}