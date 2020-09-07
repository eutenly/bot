import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, query: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "youtubeSearch",
        message,
        searchQuery: query,
        orderedPages: true,
        getData: async (query?: string, page?: number, nextPageToken?: string): Promise<any> => await message.client.youtube.search.list({
            part: ["snippet"],
            q: query,
            pageToken: nextPageToken
        }),
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, query, chIndex), commandHistoryIndex);

    // Search
    command.searchManager?.setPage(1);
}