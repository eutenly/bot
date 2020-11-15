import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, query: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "search",
        category: "youtube",
        message,
        input: query,
        url: url(query),
        orderedPages: true,
        getData: async (query?: string, page?: number, nextPageToken?: string): Promise<any> => await message.client.youtube.search.list({
            part: ["snippet"],
            q: query,
            pageToken: nextPageToken
        }),
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, query, chIndex), commandHistoryIndex);

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(query: string): ViewDataURL {

    return `https://youtube.com/results?search_query=${encodeURIComponent(query)}`;
}