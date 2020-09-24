import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, channelID: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "youtubeVideos",
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
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, channelID, chIndex), commandHistoryIndex);

    // Search
    command.searchManager?.setPage(1);
}

export function url(channelID: string): string {

    return `https://youtube.com/channel/${channelID}/videos`;
}