import fetch, { Response } from "node-fetch";
import Embed from "../../Embed/Embed";
import SearchManager from "./SearchManager";

export default async function setPage(searchManager: SearchManager, page: number): Promise<void> {

    // Set cooldown
    searchManager.command.message.author.setCooldown(searchManager.command.webScraper ? 4000 : 2000);

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
    if (!searchManager.command.parser) return;
    const parsedData: any = searchManager.command.parser(data);

    // Add to cache
    searchManager.cache.set(page, parsedData);

    // Get embed
    const embed: Embed = searchManager.command.getEmbed(searchManager.command, parsedData);

    // Send
    searchManager.command.send(embed);
}