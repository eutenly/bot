import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import joinSubreddit from "../joinSubreddit";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, subredditName: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "subreddit",
        category: "reddit",
        userRequest,
        url: url(subredditName),
        getData: `https://oauth.reddit.com/r/${encodeURIComponent(subredditName)}/about?raw_json=1`,
        getExtraData: [
            `https://oauth.reddit.com/r/${encodeURIComponent(subredditName)}/hot?raw_json=1&limit=5`
        ],
        connectionName: "reddit",
        fetch,
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [{
            emoji: "reddit_join",
            module: joinSubreddit
        }]
    }, (r: UserRequest, chIndex: number) => main(r, subredditName, chIndex), commandHistoryIndex);
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

export function url(subredditName: string): ViewDataURL {

    return `https://reddit.com/r/${subredditName}`;
}