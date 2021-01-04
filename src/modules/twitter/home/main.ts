import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import User from "../../../classes/User/User";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import helpEmbed from "../helpEmbed";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Get prefix
    const prefix: string = userRequest.channel.prefix;

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "home",
        category: "twitter",
        userRequest,
        url: url(),
        getData: (input?: string, page?: number, nextPageToken?: string, user?: User): string => `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${user?.connections["twitter"]?.id}&tweet_mode=extended&count=5`,
        getExtraData: ["https://api.twitter.com/1.1/statuses/home_timeline.json?tweet_mode=extended&count=5"],
        connectionName: "twitter",
        helpEmbed: helpEmbed(prefix),
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();
    if (command.data === null) return;

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