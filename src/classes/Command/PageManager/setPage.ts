import collectStat from "../../../util/collectStat";
import Embed from "../../Embed/Embed";
import { ParserData } from "../Command";
import PageManager from "./PageManager";

export default async function setPage(pageManager: PageManager, page: number) {

    // Set cooldown
    pageManager.command.message.author.setCooldown(pageManager.command.webScraper ? 4000 : 2000);

    // Invalid page
    if (page < 1) page = 1;

    // Get from cache
    const cachedData: any = pageManager.cache.get(page);
    if (cachedData) {

        // Set page
        pageManager.page = page;

        // Debug
        pageManager.command.debug("Setting page", { page, viaCache: true });

        // Get embed
        const embed: Embed = pageManager.command.getEmbed(pageManager.command, cachedData);

        // Send
        pageManager.command.send(embed);

        // Collect stats
        collectStat(pageManager.command.client, {
            measurement: "pages_cycled",
            tags: {
                dms: pageManager.command.message.guild ? undefined : true
            },
            fields: {
                command: pageManager.command.name,
                commandType: pageManager.command.category
            }
        });

        // Return
        return;
    }

    // Set page
    if (pageManager.orderedPages) pageManager.page = (pageManager.cache.size ? Math.max(...pageManager.cache.keys()) : 0) + 1;
    else pageManager.page = page;

    // Debug
    pageManager.command.debug("Setting page", { page: pageManager.page });

    // Get next page token
    const nextPageToken: string | null | undefined = pageManager.orderedPages ? pageManager.nextPageToken : undefined;

    // Fetch data
    const parserData: ParserData | undefined = await pageManager.command.fetchData(pageManager.input, pageManager.page, nextPageToken);

    // Set next page token
    if (pageManager.orderedPages) pageManager.nextPageToken = parserData ? parserData.nextPageToken : null;

    // Cache data
    if (parserData) pageManager.cacheData(pageManager.page, parserData.data);

    // Get embed
    const embed: Embed = pageManager.command.getEmbed(pageManager.command, pageManager.cache.get(pageManager.page) || []);

    // Send
    pageManager.command.send(embed);

    // Collect stats
    collectStat(pageManager.command.client, {
        measurement: "pages_cycled",
        tags: {
            dms: pageManager.command.message.guild ? undefined : true
        },
        fields: {
            command: pageManager.command.name,
            commandType: pageManager.command.category
        }
    });
}