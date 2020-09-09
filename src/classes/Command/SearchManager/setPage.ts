import fetch, { Headers, Response } from "node-fetch";
import Embed from "../../Embed/Embed";
import { Connection } from "../../User/User";
import { ParserData } from "../Command";
import SearchManager from "./SearchManager";

export default async function setPage(searchManager: SearchManager, page: number): Promise<void> {

    // Set cooldown
    searchManager.command.message.author.setCooldown(searchManager.command.webScraper ? 4000 : 2000);

    // Invalid page
    if (page < 1) page = 1;

    // Get from cache
    const cachedData: any = searchManager.cache.get(page);
    if (cachedData) {

        // Set page
        searchManager.page = page;

        // Get embed
        const embed: Embed = searchManager.command.getEmbed(searchManager.command, cachedData);

        // Send
        searchManager.command.send(embed);

        // Return
        return;
    }

    // Set page
    if (searchManager.orderedPages) searchManager.page = (searchManager.cache.size ? Math.max(...searchManager.cache.keys()) : 0) + 1;
    else searchManager.page = page;

    // Define data
    let data: any;

    // Get next page token
    const nextPageToken: string | null | undefined = searchManager.orderedPages ? searchManager.nextPageToken : undefined;

    // Regular commands
    if ((searchManager.command.getURL) && (nextPageToken !== null)) {

        // Get url
        const url: string = searchManager.command.getURL(searchManager.input, page, nextPageToken);

        // Define headers
        const headers: Headers = new Headers();

        // Set user agent header
        headers.set("User-Agent", searchManager.command.webScraper ? "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36" : "Eutenly");

        // Set authorization header
        if ((searchManager.command.getAuthorizationHeader) && (searchManager.command.connectionName)) {
            const connection: Connection | undefined = searchManager.command.message.author.connections[searchManager.command.connectionName];
            headers.set("Authorization", await searchManager.command.getAuthorizationHeader(connection, url, "GET"));
        }

        // Make request
        const result: Response = await fetch(url, { headers });

        // Parse result
        if (result.status === 204) data = {};
        else if (searchManager.command.webScraper) data = await result.text();
        else data = await result.json();
    }

    // Commands that have a custom function for getting data
    else if ((searchManager.command.getData) && (nextPageToken !== null)) data = await searchManager.command.getData(searchManager.input, page, nextPageToken);

    // Run parser
    if (!searchManager.command.parser) return;
    const parserData: ParserData = searchManager.command.parser(data);

    // Authorization failed
    if (parserData.authorizationFailed) return searchManager.command.sendLoginEmbed();

    // If theres no data, set it to an empty array
    if (parserData.noData) parserData.data = [];

    // Set next page token
    if (searchManager.orderedPages) searchManager.nextPageToken = parserData.noData ? null : parserData.nextPageToken;

    // Split data into pages
    if (searchManager.splitPages) for (let i = 0; i < Math.ceil(parserData.data.length / searchManager.splitPages); i++) {

        // Add to cache
        searchManager.cache.set(page + i, parserData.data.slice(i * searchManager.splitPages, (i * searchManager.splitPages) + searchManager.splitPages));
    }
    else searchManager.cache.set(page, parserData.data);

    // Get embed
    const embed: Embed = searchManager.command.getEmbed(searchManager.command, searchManager.cache.get(page));

    // Send
    searchManager.command.send(embed);
}