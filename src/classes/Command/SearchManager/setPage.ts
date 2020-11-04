import collectStat from "../../../util/collectStat";
import Embed from "../../Embed/Embed";
import { ParserData } from "../Command";
import SearchManager from "./SearchManager";

export default async function setPage(searchManager: SearchManager, page: number): Promise<void> {

    // Set cooldown
    searchManager.command.message.author.setCooldown(searchManager.command.webScraper ? 4000 : 2000);

    // Invalid page
    if (page < 1) page = 1;

    // Get from cache
    const cachedData: any = searchManager.cache.get(page);
    if ((cachedData) || (searchManager.allData)) {

        // Set page
        searchManager.page = page;

        // Get embed
        const embed: Embed = searchManager.command.getEmbed(searchManager.command, cachedData || []);

        // Send
        searchManager.command.send(embed);

        // Collect stats
        collectStat(searchManager.command.client, {
            measurement: "pages_cycled",
            tags: {
                dms: searchManager.command.message.guild ? undefined : true
            },
            fields: {
                command: searchManager.command.name,
                commandType: searchManager.command.type
            }
        });

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

    // Cache data
    searchManager.cacheData(page, parserData.data);

    // Get embed
    const embed: Embed = searchManager.command.getEmbed(searchManager.command, searchManager.cache.get(page) || []);

    // Send
    searchManager.command.send(embed);

    // Collect stats
    collectStat(searchManager.command.client, {
        measurement: "pages_cycled",
        tags: {
            dms: searchManager.command.message.guild ? undefined : true
        },
        fields: {
            command: searchManager.command.name,
            commandType: searchManager.command.type
        }
    });
}