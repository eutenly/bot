import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, name: string, type: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "posts",
        type: "reddit",
        message,
        input: name,
        url: url(name, type),
        orderedPages: true,
        getURL: (name: string = "", page?: number, nextPageToken?: string): string => `https://oauth.reddit.com/${type === "subreddit" ? "r" : "user"}/${encodeURIComponent(name)}/${type === "subreddit" ? "hot" : "submitted"}?type=links&raw_json=1&limit=5${nextPageToken ? `&after=${nextPageToken}` : ""}`,
        connectionName: "reddit",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, name, type, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);

    // Return
    return command;
}

export function url(name: string, type: string): ViewDataURL {

    return `https://reddit.com/${type === "subreddit" ? "r" : "u"}/${name}${type === "subreddit" ? "/hot" : "?sort=new"}`;
}