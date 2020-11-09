import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, artistID: string, artistName: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "albums",
        type: "spotify",
        message,
        input: artistID,
        metadata: {
            artistName
        },
        url: url(artistID),
        getURL: (artistID: string = "", page: number = 1): string => `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album,single&market=from_token&limit=5${page ? `&offset=${(page - 1) * 5}` : ""}`,
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, artistID, artistName, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);

    // Return
    return command;
}

export function url(artistID: string): ViewDataURL {

    return `https://open.spotify.com/artist/${artistID}`;
}