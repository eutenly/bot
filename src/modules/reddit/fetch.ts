import nodeFetch, { Response } from "node-fetch";
import Channel from "../../classes/Channel/Channel";
import User, { Connection } from "../../classes/User/User";
import refreshToken from "./refreshToken";

export default async function fetch(user: User, channel: Channel, url: string, method: string = "GET"): Promise<any> {

    // Get connection
    const connection: Connection | undefined = user.connections["reddit"];
    if (!connection) return;

    // Make request
    const result: Response = await nodeFetch(url, {
        method,
        headers: {
            "User-Agent": "Eutenly",
            "Authorization": `Bearer ${connection.accessToken}`
        }
    });

    // Parse data
    let tokenExpired: boolean = false;
    if (result.status === 404) return { error: 404 };
    const data: any = await result.json().catch(() => tokenExpired = true);

    // Token expired
    if (tokenExpired) {

        // Refresh token
        await refreshToken(user);

        // Fetch
        return await fetch(user, channel, url);
    }

    // Return
    return data;
}