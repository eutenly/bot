import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import add from "../add";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";

export default async function main(userRequest: UserRequest, episodeID: string, progress?: number, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "episode",
        category: "spotify",
        userRequest,
        metadata: {
            progress
        },
        url: url(episodeID),
        getData: `https://api.spotify.com/v1/episodes/${encodeURIComponent(episodeID)}`,
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed
    }, (r: UserRequest, chIndex: number) => main(r, episodeID, progress, chIndex), commandHistoryIndex);
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

export function url(episodeID: string): ViewDataURL {

    return `https://open.spotify.com/episode/${episodeID}`;
}