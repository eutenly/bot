import cheerio from "cheerio";
import Command, { ViewDataURL } from "../../classes/Command/Command";
import UserRequest from "../../classes/UserRequest/UserRequest";
import embed from "./embed";
import fetch from "./fetch";
import parse from "./parse";
import view from "./view";

export default async function search(userRequest: UserRequest, query: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "search",
        category: "search",
        userRequest,
        webScraper: true,
        input: query,
        url: url(query),
        getData: (query: string = "", page: number = 1): string => `https://bing.com/search?q=${encodeURIComponent(query)}&first=${(page - 1) * 5}`,
        getExtraData: [
            async (data: any): Promise<any> => {

                // Parse
                const dom: any = cheerio.load(data);

                // If there's an element with the `vsathm` class in the element with the `b_results` id, then this result has videos
                const videos: any = dom("#b_results .vsathm").first();
                if (!videos.length) return;

                // Return
                return await userRequest.client.youtube.search.list({
                    part: ["snippet"],
                    q: query,
                    maxResults: 3,
                    type: ["video"]
                });
            }
        ],
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => search(r, query, chIndex), commandHistoryIndex);

    // Search
    await command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(query: string): ViewDataURL {

    return {
        title: "Search",
        description: query,
        url: `eutenly://search?query=${encodeURIComponent(query)}`
    };
}