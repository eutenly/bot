import FetchQueue, { RequestData } from "./FetchQueue";

export default async function processRequests(fetchQueue: FetchQueue) {

    // Sleep
    const sleep = (amount: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, amount));

    // Set processing requests
    fetchQueue.processingRequests = true;

    // Loop through requests
    while (fetchQueue.requests.length > 0) {

        // Get request data
        const requestData: RequestData | undefined = fetchQueue.requests.shift();
        if (!requestData) break;

        // Await rate limit
        if ((fetchQueue.rateLimit) && (fetchQueue.rateLimit.remaining === 0)) await sleep(fetchQueue.rateLimit.reset - Date.now());

        // Fetch
        const result = await fetchQueue.client.fetch(requestData.path, requestData.data).catch((err: Error) => requestData.reject(err));
        if (!result) continue;

        // Update rate limit
        if (result.rateLimit) fetchQueue.rateLimit = result.rateLimit;

        // Resolve
        requestData.resolve(result.data);
    }

    // Set processing requests
    fetchQueue.processingRequests = false;
}