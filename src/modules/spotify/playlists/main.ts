import Command, { ViewDataURL } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "playlists",
        category: "spotify",
        userRequest,
        input: "me",
        url: url(),
        getData: (input: string = "", page: number = 1): string => `https://api.spotify.com/v1/me/playlists?limit=5${page ? `&offset=${(page - 1) * 5}` : ""}`,
        connectionName: "spotify",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    await command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(): ViewDataURL {

    return {
        title: "Spotify",
        description: "Playlists",
        url: "eutenly://spotify/playlists"
    };
}