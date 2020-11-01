import nodeFetch, { RequestInit, Response } from "node-fetch";
import RateLimit from "../common/RateLimit";
import Client from "./Client";

export default async function fetch(client: Client, path: string, options: RequestInit = {}, headers: object = {}): Promise<{ data: any; rateLimit: RateLimit | undefined; }> {

    // Parse body
    if (options.body) options.body = JSON.stringify(options.body);

    // Make request
    const result: Response = await nodeFetch(`https://discord.com/api/v6${path}`, {
        headers: {
            "User-Agent": "Eutenly (https://eutenly.com, 1.0)",
            "Authorization": `Bot ${client.token}`,
            "Content-Type": options.method === "DELETE" ? undefined : "application/json",
            "X-RateLimit-Precision": "millisecond",
            ...headers
        } as any,
        ...options
    });

    // Parse result
    let data: any = {};
    if (result.status !== 204) data = await result.json();

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

    // API error
    if (data.code !== undefined) throw new Error(`API Error: ${data.code} ${data.message} at ${path}`);

    // Return
    return {
        data,
        rateLimit
    };
}