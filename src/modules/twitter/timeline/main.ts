import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, userID: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "timeline",
        category: "twitter",
        message,
        input: userID,
        url: url(userID),
        orderedPages: true,
        getData: (userID: string = "", page?: number, nextPageToken?: string): string => `https://api.twitter.com/1.1/statuses/${userID === "home" ? "home" : "user"}_timeline.json?${userID === "home" ? "" : `user_id=${encodeURIComponent(userID)}&`}count=50&tweet_mode=extended${nextPageToken ? `&max_id=${nextPageToken}` : ""}`,
        connectionName: "twitter",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, userID, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(userID: string): ViewDataURL {

    return {
        title: "Twitter",
        description: "User Timeline",
        url: `eutenly://twitter/timeline/${userID}`
    };
}