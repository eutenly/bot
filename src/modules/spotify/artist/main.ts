import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import followArtist from "../followArtist";
import play from "../play";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, artistID: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "artist",
        category: "spotify",
        userRequest,
        url: url(artistID),
        getData: `https://api.spotify.com/v1/artists/${encodeURIComponent(artistID)}`,
        getExtraData: [
            (data: any): string => `https://api.spotify.com/v1/artists/${data.id}/top-tracks?market=from_token`,
            (data: any): string => `https://api.spotify.com/v1/artists/${data.id}/albums?limit=5&include_groups=album,single&market=from_token`
        ],
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [
            {
                emoji: "spotify_play",
                module: play
            },
            {
                emoji: "spotify_follow",
                module: followArtist
            }
        ]
    }, (r: UserRequest, chIndex: number) => main(r, artistID, chIndex), commandHistoryIndex);
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

export function url(artistID: string): ViewDataURL {

    return `https://open.spotify.com/artist/${artistID}`;
}