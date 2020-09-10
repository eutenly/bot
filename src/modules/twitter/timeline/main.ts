import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import setHeaders from "../setHeaders";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, userID: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "twitterTimeline",
        message,
        input: userID,
        orderedPages: true,
        getURL: (userID: string = "", page?: number, nextPageToken?: string): string => `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${encodeURIComponent(userID)}&count=50&tweet_mode=extended${nextPageToken ? `&max_id=${nextPageToken}` : ""}`,
        connectionName: "twitter",
        setHeaders,
        splitPages: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, userID, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);
}