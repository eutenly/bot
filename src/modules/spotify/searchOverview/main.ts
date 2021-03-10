import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, query: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "searchOverview",
        category: "spotify",
        userRequest,
        metadata: {
            query
        },
        url: url(query),
        getData: `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist,album&market=from_token&limit=5`,
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, query, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();
    if (command.data === null) return;

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    await command.send(commandEmbed);

    // Return
    return command;
}

export function url(query: string): ViewDataURL {

    return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}