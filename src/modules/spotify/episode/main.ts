import ChannelCommands from "../../../classes/Channel/ChannelCommands/ChannelCommands";
import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import add from "../add";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";

export default async function main(message: Message, episodeID: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "episode",
        category: "spotify",
        message,
        url: url(episodeID),
        getData: `https://api.spotify.com/v1/episodes/${encodeURIComponent(episodeID)}`,
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed
    }, (m: Message, chIndex: number) => main(m, episodeID, chIndex), commandHistoryIndex);
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
            module: (msg: Message) => add(msg, command.data.id, command.data.name, "episode")
        }]
    });

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}

export function url(episodeID: string): ViewDataURL {

    return `https://open.spotify.com/episode/${episodeID}`;
}