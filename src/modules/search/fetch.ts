import nodeFetch, { Response } from "node-fetch";
import Channel from "../../classes/Channel/Channel";
import User from "../../classes/User/User";

export default async function fetch(user: User, channel: Channel, url: string): Promise<any> {

    // Make request
    const result: Response = await nodeFetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
        }
    });

    // Parse data
    const data: string = await result.text();

    // Return
    return data;
}