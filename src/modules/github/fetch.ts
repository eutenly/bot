import nodeFetch, { Response } from "node-fetch";
import Channel from "../../classes/Channel/Channel";
import User, { Connection } from "../../classes/User/User";
import sendLoginEmbed from "../../util/sendLoginEmbed";

export default async function fetch(user: User, channel: Channel, url: string, method: string = "GET"): Promise<any> {

    // Get connection
    const connection: Connection | undefined = user.connections["github"];
    if (!connection) return;

    // Make request
    const result: Response = await nodeFetch(url, {
        method,
        headers: {
            "User-Agent": "Eutenly",
            "Authorization": `token ${connection.accessToken}`,
            "Accept": "application/vnd.github.v3+json"
        }
    });

    // Parse data
    const data: any = await result.json().catch(() => { }) || {};

    // Authorization failed
    if (data.message === "Bad credentials") {
        sendLoginEmbed(user, channel, "github");
        return;
    }

    // Return
    return data;
}