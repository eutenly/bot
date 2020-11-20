import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import embedVideo from "../embedVideo";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, videoID: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "video",
        category: "youtube",
        message,
        url: url(videoID),
        getData: async (): Promise<any> => await message.client.youtube.videos.list({
            part: ["snippet", "contentDetails", "statistics"],
            id: [videoID]
        }),
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [{
            emoji: "youtube",
            module: embedVideo
        }]
    }, (m: Message, chIndex: number) => main(m, videoID, chIndex), commandHistoryIndex);

    // Fetch
    await command.fetchData();
    if (!command.data) return;

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}

export function url(videoID: string): ViewDataURL {

    return `https://youtube.com/watch?v=${videoID}`;
}