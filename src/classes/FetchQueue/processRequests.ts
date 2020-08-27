import RateLimit from "../common/RateLimit";
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
        const { data, rateLimit }: { data: any; rateLimit: RateLimit | undefined; } = await fetchQueue.client.fetch(requestData.path, requestData.data);

        // Update rate limit
        if (rateLimit) fetchQueue.rateLimit = rateLimit;

        // Resolve
        requestData.resolve(data);
    }

    // Set processing requests
    fetchQueue.processingRequests = false;
}