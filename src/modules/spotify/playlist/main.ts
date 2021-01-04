import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import play from "../play";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, playlistID: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "playlist",
        category: "spotify",
        userRequest,
        url: url(playlistID),
        getData: `https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistID)}`,
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [{
            emoji: "spotify_play",
            module: play
        }]
    }, (r: UserRequest, chIndex: number) => main(r, playlistID, chIndex), commandHistoryIndex);
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

export function url(playlistID: string): ViewDataURL {

    return `https://open.spotify.com/playlist/${playlistID}`;
}