import nodeFetch, { Response } from "node-fetch";
import Message from "../../classes/Message/Message";
import { Connection } from "../../classes/User/User";
import sendLoginEmbed from "../../util/sendLoginEmbed";

export default async function fetch(message: Message, url: string): Promise<any> {

    // Get connection
    const connection: Connection | undefined = message.author.connections["github"];
    if (!connection) return;

    // Make request
    const result: Response = await nodeFetch(url, {
        headers: {
            "User-Agent": "Eutenly",
            "Authorization": `token ${connection.accessToken}`,
            "Accept": "application/vnd.github.v3+json"
        }
    });

    // Parse data
    const data: any = result.status === 204 ? {} : await result.json();

    // Authorization failed
    if (data.message === "Bad credentials") {
        sendLoginEmbed(message, "github");
        return;
    }

    // Return
    return data;
}