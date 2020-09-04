import fetch, { Response } from "node-fetch";
import Embed from "../../Embed/Embed";
import SearchManager, { CachedResult } from "./SearchManager";

export default async function getPage(searchManager: SearchManager, page: number): Promise<Embed> {

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
    return searchManager.getEmbed(searchManager, parsedData);
}