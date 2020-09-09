import nodeFetch, { Response } from "node-fetch";
import Embed from "../Embed/Embed";
import Command from "./Command";

export default async function fetch(command: Command): Promise<any> {

    // Define data
    let data: any;

    // Regular commands
    if (command.getURL) {

        // Make request
        const result: Response = await nodeFetch(command.getURL(), {
            headers: command.webScraper ? { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36" } : {}
        });

        // Parse result
        if (result.status === 204) data = {};
        else if (command.webScraper) data = await result.text();
        else data = await result.json();
    }

    // Commands that have a custom function for getting data
    else if (command.getData) data = await command.getData();

    // Run parser
    if (!command.parser) return;
    const parsedData: any = command.parser(data);

    // Set data
    command.data = parsedData;
}