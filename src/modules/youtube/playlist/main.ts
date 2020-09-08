import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, playlistID: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "youtubePlaylist",
        message,
        getData: async (): Promise<any> => await message.client.youtube.playlists.list({
            part: ["snippet", "contentDetails"],
            id: [playlistID]
        }),
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, playlistID, chIndex), commandHistoryIndex);

    // Fetch
    await command.fetch();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);
}