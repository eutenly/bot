import nodeFetch, { RequestInit, Response } from "node-fetch";
import RateLimit from "../common/RateLimit";
import Client from "./Client";

export interface RequestOptions {
    path: string;
    apiVersion?: number;
    options?: RequestInit;
    headers?: object;
}

export default async function fetch(client: Client, requestOptions: RequestOptions): Promise<{ data: any; rateLimit: RateLimit | undefined; }> {

    // Parse body
    if (requestOptions.options?.body) requestOptions.options.body = JSON.stringify(requestOptions.options.body);

    // Make request
    const result: Response = await nodeFetch(`https://discord.com/api/v${requestOptions.apiVersion || 6}${requestOptions.path}`, {
        headers: {
            "User-Agent": "Eutenly (https://eutenly.com, 1.0)",
            "Authorization": `Bot ${client.token}`,
            "Content-Type": requestOptions.options?.method === "DELETE" ? undefined : "application/json",
            "X-RateLimit-Precision": "millisecond",
            ...requestOptions.headers
        } as any,
        ...requestOptions.options
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
    if (data.code !== undefined) throw new Error(`API Error: ${data.code} ${data.message} at ${requestOptions.path}`);

    // Return
    return {
        data,
        rateLimit
    };
}