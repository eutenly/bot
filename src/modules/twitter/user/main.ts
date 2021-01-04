import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import followUser from "../followUser";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, user: string, type: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "user",
        category: "twitter",
        userRequest,
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
    }, (r: UserRequest, chIndex: number) => main(r, user, type, chIndex), commandHistoryIndex);
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