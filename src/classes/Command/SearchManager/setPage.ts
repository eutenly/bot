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

    // Get next page token
    const nextPageToken: string | null | undefined = searchManager.orderedPages ? searchManager.nextPageToken : undefined;

    // Fetch data
    const parserData: ParserData | undefined = await searchManager.command.fetchData(searchManager.input, page, nextPageToken);
    if (!parserData) return;

    // Set next page token
    if (searchManager.orderedPages) searchManager.nextPageToken = parserData.noData ? null : parserData.nextPageToken;

    // Split data into pages
    if (searchManager.splitPages) for (let i = 0; i < Math.ceil(parserData.data.length / searchManager.splitPages); i++) {

        // Add to cache
        searchManager.cache.set(page + i, parserData.data.slice(i * searchManager.splitPages, (i * searchManager.splitPages) + searchManager.splitPages));
    }
    else searchManager.cache.set(page, parserData.data);

    // Get embed
    const embed: Embed = searchManager.command.getEmbed(searchManager.command, searchManager.cache.get(page) || []);

    // Send
    searchManager.command.send(embed);
}