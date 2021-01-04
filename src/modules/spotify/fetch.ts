import nodeFetch, { Response } from "node-fetch";
import User, { Connection } from "../../classes/User/User";
import UserRequest from "../../classes/UserRequest/UserRequest";
import sendLoginEmbed from "../../util/sendLoginEmbed";
import refreshToken from "./refreshToken";

export default async function fetch(user: User, userRequest: UserRequest, url: string, method: string = "GET", body?: any): Promise<any> {

    // Get connection
    const connection: Connection | undefined = user.connections["spotify"];
    if (!connection) {
        sendLoginEmbed(user, userRequest, "spotify");
        return;
    }

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
    const data: any = await result.json().catch(() => { }) || {};

    // Authorization failed
    if (data.error?.message === "Invalid access token") {
        sendLoginEmbed(user, userRequest, "spotify");
        return;
    }

    // Token expired
    if (data.error?.message === "The access token expired") {

        // Refresh token
        await refreshToken(user);

        // Fetch
        return await fetch(user, userRequest, url, method, body);
    }

    // Return
    return data;
}