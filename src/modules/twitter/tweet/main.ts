import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import getAuthorizationHeader from "../getAuthorizationHeader";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, tweetID: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "twitterTweet",
        message,
        getURL: (): string => `https://api.twitter.com/1.1/statuses/show.json?id=${encodeURIComponent(tweetID)}&tweet_mode=extended`,
        connectionName: "twitter",
        getAuthorizationHeader,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, tweetID, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // Fetch
    await command.fetch();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);
}