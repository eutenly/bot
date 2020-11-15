import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "feed",
        category: "reddit",
        message,
        input: "feed",
        url: url(),
        orderedPages: true,
        getData: (name: string = "", page?: number, nextPageToken?: string): string => `https://oauth.reddit.com/best?raw_json=1&limit=5${nextPageToken ? `&after=${nextPageToken}` : ""}`,
        connectionName: "reddit",
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

    return "https://reddit.com";
}