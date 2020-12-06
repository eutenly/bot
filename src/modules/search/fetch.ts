import nodeFetch, { Response } from "node-fetch";
import Channel from "../../classes/Channel/Channel";
import User from "../../classes/User/User";

export default async function fetch(user: User, channel: Channel, url: string): Promise<any> {

    // Make request
    const result: Response = await nodeFetch(url, {
        headers: {
            "User-Agent": process.env.WEB_SCRAPING_USER_AGENT as string,
        }
    });

    // Parse data
    const data: string = await result.text();

    // Return
    return data;
}