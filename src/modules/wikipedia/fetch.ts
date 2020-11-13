import nodeFetch, { Response } from "node-fetch";
import Channel from "../../classes/Channel/Channel";
import User from "../../classes/User/User";

export default async function fetch(user: User, channel: Channel, url: string): Promise<any> {

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