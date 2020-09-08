import fetch, { Response } from "node-fetch";
import Embed from "../../Embed/Embed";
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

        // Make request
        const result: Response = await fetch(searchManager.command.getURL(searchManager.input, page, nextPageToken), {
            headers: {
                "User-Agent": searchManager.command.webScraper ? "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36" : "Eutenly"
            }
        });

        // Parse result
        if (result.status === 204) data = {};
        else if (searchManager.command.webScraper) data = await result.text();
        else data = await result.json();
    }

    // Commands that have a custom function for getting data
    else if ((searchManager.command.getData) && (nextPageToken !== null)) data = await searchManager.command.getData(searchManager.input, page, nextPageToken);

    // Run parser
    if (!searchManager.command.parser) return;
    const parserData: any = searchManager.command.parser(data);
    const parsedData: any = searchManager.orderedPages ? parserData.data : parserData;

    // Set next page token
    if (searchManager.orderedPages) searchManager.nextPageToken = parserData.nextPageToken;

    // Add to cache
    searchManager.cache.set(page, parsedData);

    // Get embed
    const embed: Embed = searchManager.command.getEmbed(searchManager.command, parsedData);

    // Send
    searchManager.command.send(embed);
}