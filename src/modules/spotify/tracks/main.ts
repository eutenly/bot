import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, itemID: string, itemName: string, type: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "tracks",
        type: "spotify",
        message,
        input: itemID,
        metadata: {
            type,
            itemName
        },
        url: url(itemID, type),
        getURL: (itemID: string = "", page: number = 1): string => `https://api.spotify.com/v1/${type === "album" ? "albums" : "playlists"}/${itemID}/tracks?limit=5${page ? `&offset=${(page - 1) * 5}` : ""}`,
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, itemID, itemName, type, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);

    // Return
    return command;
}

export function url(itemID: string, type: string): string {

    return `https://open.spotify.com/${type}/${itemID}`;
}