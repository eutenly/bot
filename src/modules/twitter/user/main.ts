import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import followUser from "../followUser";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, user: string, type: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "user",
        category: "twitter",
        message,
        url: url(user),
        getData: `https://api.twitter.com/1.1/users/show.json?${type === "id" ? "user_id" : "screen_name"}=${encodeURIComponent(user)}`,
        connectionName: "twitter",
        fetch,
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [{
            emoji: "twitter_follow",
            module: followUser
        }]
    }, (m: Message, chIndex: number) => main(m, user, type, chIndex), commandHistoryIndex);
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

export function url(user: string): ViewDataURL {

    return `https://twitter.com/${user}`;
}