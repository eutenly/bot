import nodeFetch, { Response } from "node-fetch";
import User, { Connection } from "../../classes/User/User";
import UserRequest from "../../classes/UserRequest/UserRequest";
import sendLoginEmbed from "../../util/sendLoginEmbed";
import refreshToken from "./refreshToken";

export default async function fetch(user: User, userRequest: UserRequest, url: string, method: string = "GET", body?: any): Promise<any> {

    // Get connection
    const connection: Connection | undefined = user.connections["reddit"];
    if (!connection) {
        sendLoginEmbed(user, userRequest, "reddit");
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
    let tokenExpired: boolean = false;
    if (result.status === 404) return { error: 404 };
    const data: any = await result.json().catch(() => tokenExpired = true);

    // Token expired
    if (tokenExpired) {

        // Refresh token
        await refreshToken(user);

        // Fetch
        return await fetch(user, userRequest, url, method, body);
    }

    // Return
    return data;
}