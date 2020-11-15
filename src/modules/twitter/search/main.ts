import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, query: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "search",
        category: "twitter",
        message,
        input: query,
        url: url(query),
        orderedPages: true,
        getData: (query: string = "", page?: number, nextPageToken?: string): string => `https://api.twitter.com/1.1/search/tweets.json?q=${encodeURIComponent(query)}&count=5&result_type=popular&tweet_mode=extended${nextPageToken ? `&max_id=${nextPageToken}` : ""}`,
        connectionName: "twitter",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, query, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(query: string): ViewDataURL {

    return `https://twitter.com/search?q=${encodeURIComponent(query)}`;
}