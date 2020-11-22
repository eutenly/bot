import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import followUser from "../followUser";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, name: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "user",
        category: "github",
        message,
        url: url(name),
        getData: `https://api.github.com/users/${encodeURIComponent(name)}`,
        connectionName: "github",
        fetch,
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [{
            emoji: "github_follow",
            module: followUser
        }]
    }, (m: Message, chIndex: number) => main(m, name, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();
    if (command.data === null) return;

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}

export function url(name: string): ViewDataURL {

    return `https://github.com/${name}`;
}