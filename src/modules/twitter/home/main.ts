import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import User from "../../../classes/User/User";
import fetch from "../fetch";
import helpEmbed from "../helpEmbed";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Get prefix
    const prefix: string = message.channel.prefix;

    // Create command
    const command: Command = new Command(message.client, {
        name: "home",
        category: "twitter",
        message,
        url: url(),
        getData: (input?: string, page?: number, nextPageToken?: string, user?: User): string => `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${user?.connections["twitter"]?.id}&tweet_mode=extended&count=5`,
        getExtraData: ["https://api.twitter.com/1.1/statuses/home_timeline.json?tweet_mode=extended&count=5"],
        connectionName: "twitter",
        helpEmbed: helpEmbed(prefix),
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, chIndex), commandHistoryIndex);
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

export function url(): ViewDataURL {

    return "https://twitter.com";
}