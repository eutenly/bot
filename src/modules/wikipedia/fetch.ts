import nodeFetch, { Response } from "node-fetch";
import Message from "../../classes/Message/Message";

export default async function fetch(message: Message, url: string): Promise<any> {

    // Make request
    const result: Response = await nodeFetch(url, {
        headers: {
            "User-Agent": "Eutenly",
        }
    });

    // Parse data
    const data: string = await result.json();

    // Return
    return data;
}