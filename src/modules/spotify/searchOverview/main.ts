import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, query: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "searchOverview",
        type: "spotify",
        message,
        metadata: {
            query
        },
        url: url(query),
        getURL: (): string => `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist,album&market=from_token&limit=5`,
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, query, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}

export function url(query: string): ViewDataURL {

    return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}