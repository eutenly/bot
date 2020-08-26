import nodeFetch, { RequestInit, Response } from "node-fetch";
import Client from "./Client";

export default async function fetch(client: Client, path: string, options: RequestInit = {}, headers: object = {}): Promise<any> {

    // Make request
    const result: Response = await nodeFetch(`https://discord.com/api/v6${path}`, {
        headers: {
            "Authorization": `Bot ${client.token}`,
            ...headers
        },
        ...options
    });

    // Parse result
    const data: any = await result.json();

    // Return
    return data;
}