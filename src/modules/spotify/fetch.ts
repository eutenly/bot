import nodeFetch, { Response } from "node-fetch";
import Command from "../../classes/Command/Command";
import { Connection } from "../../classes/User/User";
import refreshToken from "./refreshToken";

export default async function fetch(command: Command, url: string, method: string = "GET", connection: Connection = {}): Promise<any> {

    // Make request
    const result: Response = await nodeFetch(url, {
        method,
        headers: {
            "User-Agent": "Eutenly",
            "Authorization": `Bearer ${connection.accessToken}`
        }
    });

    // Parse data
    const data: any = result.status === 204 ? {} : await result.json();

    // Authorization failed
    if (data.error?.message === "Invalid access token") {
        command.sendLoginEmbed();
        return;
    }

    // Token expired
    if (data.error?.message === "The access token expired") {

        // Refresh token
        await refreshToken(command);

        // Fetch
        return await fetch(command, url, method, connection);
    }

    // Return
    return data;
}