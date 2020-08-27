import chalk from "chalk";
import nodeFetch, { RequestInit, Response } from "node-fetch";
import RateLimit from "../common/RateLimit";
import Client from "./Client";

export default async function fetch(client: Client, path: string, options: RequestInit = {}, headers: object = {}): Promise<{ data: any; rateLimit: RateLimit | undefined; }> {

    // Parse body
    if (options.body) options.body = JSON.stringify(options.body);

    // Make request
    const result: Response = await nodeFetch(`https://discord.com/api/v6${path}`, {
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json",
            "X-RateLimit-Precision": "millisecond",
            ...headers
        },
        ...options
    });

    // Parse result
    const data: any = await result.json();

    // Parse rate limit
    const bucket: string | null = result.headers.get("X-RateLimit-Bucket");
    const rawRemaining: string = result.headers.get("X-RateLimit-Remaining") || "";
    const rawReset: string = result.headers.get("X-RateLimit-Reset") || "";

    const remaining = parseInt(rawRemaining) || 0;
    const reset = (parseFloat(rawReset) * 1000) || 0;

    let rateLimit: RateLimit | undefined;
    if (bucket) rateLimit = {
        bucket,
        remaining,
        reset
    };

    // Return
    return {
        data,
        rateLimit
    };
}