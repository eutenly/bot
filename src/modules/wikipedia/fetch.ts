import nodeFetch, { Response } from "node-fetch";
import User from "../../classes/User/User";
import UserRequest from "../../classes/UserRequest/UserRequest";

export default async function fetch(user: User, userRequest: UserRequest, url: string): Promise<any> {

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