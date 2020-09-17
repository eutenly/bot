import nodeFetch, { Response } from "node-fetch";
import Command from "../../classes/Command/Command";
import { Connection } from "../../classes/User/User";

export default async function fetch(command: Command, url: string, method: string = "GET", connection: Connection = {}): Promise<any> {

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
    const data: any = result.status === 204 ? {} : await result.json();

    // Authorization failed
    if (data.message === "Bad credentials") {
        command.sendLoginEmbed();
        return;
    }

    // Return
    return data;
}