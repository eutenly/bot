import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import likeTweet from "../likeTweet";
import retweetTweet from "../retweetTweet";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, tweetID: string, user: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "tweet",
        category: "twitter",
        userRequest,
        url: url(user, tweetID),
        getData: `https://api.twitter.com/1.1/statuses/show.json?id=${encodeURIComponent(tweetID)}&tweet_mode=extended`,
        connectionName: "twitter",
        fetch,
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [
            {
                emoji: "twitter_like",
                module: likeTweet
            },
            {
                emoji: "twitter_retweet",
                module: retweetTweet
            }
        ]
    }, (r: UserRequest, chIndex: number) => main(r, tweetID, user, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();
    if (command.data === null) return;

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    await command.send(commandEmbed);

    // Return
    return command;
}

export function url(user: string, tweetID: string): ViewDataURL {

    return `https://twitter.com/${user}/status/${tweetID}`;
}