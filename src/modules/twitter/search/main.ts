import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import getAuthorizationHeader from "../getAuthorizationHeader";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, query: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "twitterSearch",
        message,
        input: query,
        orderedPages: true,
        getURL: (query: string = "", page?: number, nextPageToken?: string): string => `https://api.twitter.com/1.1/search/tweets.json?q=${encodeURIComponent(query)}&count=5&result_type=popular&tweet_mode=extended${nextPageToken ? `&max_id=${nextPageToken}` : ""}`,
        connectionName: "twitter",
        getAuthorizationHeader,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, query, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // Search
    command.searchManager?.setPage(1);
}