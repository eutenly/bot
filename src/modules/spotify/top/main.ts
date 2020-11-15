import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, type: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "top",
        category: "spotify",
        message,
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
    }, (m: Message, chIndex: number) => main(m, type, chIndex), commandHistoryIndex);
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