import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, channelID: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "videos",
        category: "youtube",
        message,
        input: channelID,
        url: url(channelID),
        orderedPages: true,
        getData: async (channelID?: string, page?: number, nextPageToken?: string): Promise<any> => await message.client.youtube.search.list({
            part: ["snippet"],
            channelId: channelID,
            type: ["video"],
            order: "date",
            pageToken: nextPageToken
        }),
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, channelID, chIndex), commandHistoryIndex);

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(channelID: string): ViewDataURL {

    return `https://youtube.com/channel/${channelID}/videos`;
}