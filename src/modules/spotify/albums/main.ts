import Command, { ViewDataURL } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, artistID: string, artistName: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "albums",
        category: "spotify",
        userRequest,
        input: artistID,
        metadata: {
            artistName
        },
        url: url(artistID),
        getData: (artistID: string = "", page: number = 1): string => `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album,single&market=from_token&limit=5${page ? `&offset=${(page - 1) * 5}` : ""}`,
        connectionName: "spotify",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, artistID, artistName, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(artistID: string): ViewDataURL {

    return `https://open.spotify.com/artist/${artistID}`;
}