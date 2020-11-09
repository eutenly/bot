import nodeFetch, { Response } from "node-fetch";
import Channel from "../../classes/Channel/Channel";
import User, { Connection } from "../../classes/User/User";
import sendLoginEmbed from "../../util/sendLoginEmbed";
import refreshToken from "./refreshToken";

export default async function fetch(user: User, channel: Channel, url: string, method: string = "GET", body?: any): Promise<any> {

    // Get connection
    const connection: Connection | undefined = user.connections["spotify"];
    if (!connection) return;

    // Make request
    const result: Response = await nodeFetch(url, {
        method,
        headers: {
            "User-Agent": "Eutenly",
            "Authorization": `Bearer ${connection.accessToken}`
        },
        body: body && JSON.stringify(body)
    });

    // Parse data
    const data: any = result.status === 204 ? {} : await result.json();

    // Authorization failed
    if (data.error?.message === "Invalid access token") {
        sendLoginEmbed(user, channel, "spotify");
        return;
    }

    // Token expired
    if (data.error?.message === "The access token expired") {

        // Refresh token
        await refreshToken(user);

        // Fetch
        return await fetch(user, channel, url, method);
    }

    // Return
    return data;
}