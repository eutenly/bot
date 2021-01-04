import nodeFetch, { Response } from "node-fetch";
import User from "../../classes/User/User";
import UserRequest from "../../classes/UserRequest/UserRequest";

export default async function fetch(user: User, userRequest: UserRequest, url: string): Promise<any> {

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