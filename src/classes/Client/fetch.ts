import nodeFetch from "node-fetch";
import Client from "./Client";

export default async function fetch(client: Client, path: string): Promise<any> {

    // Make request
    const result = await nodeFetch(`https://discord.com/api/v6${path}`, {
        headers: {
            "Authorization": `Bot ${client.token}`
        }
    });

    // Parse result
    const data: any = await result.json();

    // Return
    return data;
}