import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, tweetID: string, user: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "tweet",
        type: "twitter",
        message,
        url: url(user, tweetID),
        getURL: (): string => `https://api.twitter.com/1.1/statuses/show.json?id=${encodeURIComponent(tweetID)}&tweet_mode=extended`,
        connectionName: "twitter",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, tweetID, user, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}

export function url(user: string, tweetID: string): string {

    return `https://twitter.com/${user}/status/${tweetID}`;
}