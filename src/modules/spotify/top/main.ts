import Command, { ViewDataURL } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, type: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "top",
        category: "spotify",
        userRequest,
        input: type,
        metadata: {
            type
        },
        url: url(type),
        getData: (input: string = "", page: number = 1): string => `https://api.spotify.com/v1/me/top/${type}?limit=5${page ? `&offset=${(page - 1) * 5}` : ""}`,
        connectionName: "spotify",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, type, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(type: string): ViewDataURL {

    return {
        title: "Spotify",
        description: `Top ${type === "tracks" ? "Tracks" : "Artists"}`,
        url: `eutenly://spotify/top/${type}`
    };
}