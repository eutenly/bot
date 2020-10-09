import nodeFetch, { Response } from "node-fetch";
import Message from "../../classes/Message/Message";
import { Connection } from "../../classes/User/User";
import refreshToken from "./refreshToken";

export default async function fetch(message: Message, url: string): Promise<any> {

    // Get connection
    const connection: Connection | undefined = message.author.connections["reddit"];
    if (!connection) return;

    // Make request
    const result: Response = await nodeFetch(url, {
        headers: {
            "User-Agent": "Eutenly",
            "Authorization": `Bearer ${connection.accessToken}`
        }
    });

    // Parse data
    let tokenExpired: boolean = false;
    const data: any = await result.json().catch(() => tokenExpired = true);

    // Token expired
    if (tokenExpired) {

        // Refresh token
        await refreshToken(message.author);

        // Fetch
        return await fetch(message, url);
    }

    // Return
    return data;
}