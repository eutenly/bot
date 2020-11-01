import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "playlists",
        type: "spotify",
        message,
        input: "me",
        url: url(),
        getURL: (input: string = "", page: number = 1): string => `https://api.spotify.com/v1/me/playlists?limit=5${page ? `&offset=${(page - 1) * 5}` : ""}`,
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);

    // Return
    return command;
}

export function url(): string {

    return "eutenly://spotify/playlists";
}