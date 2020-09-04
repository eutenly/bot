import fetch, { Response } from "node-fetch";
import Embed from "../../Embed/Embed";
import SearchManager, { CachedResult } from "./SearchManager";

export default async function setPage(searchManager: SearchManager, page: number): Promise<void> {

    // Invalid page
    if (page < 1) page = 1;

    // Set page
    searchManager.page = page;

    // Make request
    const result: Response = await fetch(searchManager.getURL(searchManager.query, page), {
        headers: searchManager.command.webScraper ? { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36" } : {}
    });

    // Parse result
    let data: any;
    if (result.status === 204) data = {};
    else if (searchManager.command.webScraper) data = await result.text();
    else data = await result.json();

    // Run parser
    const parsedData: CachedResult = searchManager.parser(data, page);

    // Add to cache
    searchManager.cache.push(parsedData);

    // Get embed
    const embed: Embed = searchManager.getEmbed(searchManager, parsedData);

    // Send or edit
    if (searchManager.command.responseMessage) searchManager.command.responseMessage.edit(embed);
    else {

        // Send
        const m = await searchManager.command.message.channel.sendMessage(embed);

        // Set data
        m.command = searchManager.command;
        searchManager.command.responseMessage = m;

        // React
        await m.addReaction(`left_arrow:${searchManager.command.client.eutenlyEmojis.get("left_arrow")}`);
        await m.addReaction(`right_arrow:${searchManager.command.client.eutenlyEmojis.get("right_arrow")}`);
    }
}