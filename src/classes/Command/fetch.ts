import nodeFetch, { Headers, Response } from "node-fetch";
import { Connection } from "../User/User";
import Command, { ParserData } from "./Command";

export default async function fetch(command: Command): Promise<any> {

    // Define data
    let data: any;

    // Regular commands
    if (command.getURL) {

        // Get url
        const url: string = command.getURL();

        // Define headers
        const headers: Headers = new Headers();

        // Set user agent header
        headers.set("User-Agent", command.webScraper ? "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36" : "Eutenly");

        // Set headers
        if ((command.setHeaders) && (command.connectionName)) {
            const connection: Connection | undefined = command.message.author.connections[command.connectionName];
            await command.setHeaders(headers, connection, url, "GET");
        }

        // Make request
        const result: Response = await nodeFetch(url, { headers });

        // Parse result
        if (result.status === 204) data = {};
        else if (command.webScraper) data = await result.text();
        else data = await result.json();
    }

    // Commands that have a custom function for getting data
    else if (command.getData) data = await command.getData();

    // Run parser
    if (!command.parser) return;
    const parserData: ParserData = command.parser(data);

    // Authorization failed
    if (parserData.authorizationFailed) return command.sendLoginEmbed();

    // Token expired
    if (parserData.tokenExpired) {

        // Refresh token
        if (!command.refreshToken) return;
        await command.refreshToken(command);

        // Fetch
        return fetch(command);
    }

    // Set data
    command.data = parserData.data;
}