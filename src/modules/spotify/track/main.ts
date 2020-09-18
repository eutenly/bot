import ChannelCommands from "../../../classes/Channel/ChannelCommands/ChannelCommands";
import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import add from "../add";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, trackID: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "spotifyTrack",
        message,
        getURL: (): string => `https://api.spotify.com/v1/tracks/${encodeURIComponent(trackID)}`,
        getExtraData: [
            (data: any): string => `https://api.spotify.com/v1/audio-features/${data.id}`,
            (data: any): string => `https://api.spotify.com/v1/albums/${data.album.id}`
        ],
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, trackID, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();

    // Channel commands
    message.channel.commands = new ChannelCommands(message.channel, {
        sourceCommand: command,
        commands: [{
            inputs: ["add", "save"],
            module: (msg: Message) => add(msg, command.data.id, command.data.name, "track")
        }]
    });

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);
}