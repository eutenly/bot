import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "history",
        category: "spotify",
        message,
        input: "me",
        url: url(),
        orderedPages: true,
        getData: (input?: string, page?: number, nextPageToken?: string): string => `https://api.spotify.com/v1/me/player/recently-played?limit=5${nextPageToken ? `&before=${nextPageToken}` : ""}`,
        connectionName: "spotify",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(): ViewDataURL {

    return {
        title: "Spotify",
        description: "History",
        url: "eutenly://spotify/history"
    };
}