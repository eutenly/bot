import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, channelID: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "youtubeChannel",
        message,
        getData: async (): Promise<any> => await message.client.youtube.channels.list({
            part: ["snippet", "statistics"],
            id: [channelID]
        }),
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, channelID, chIndex), commandHistoryIndex);

    // Fetch
    await command.fetch();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);
}