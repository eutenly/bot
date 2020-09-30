import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, subredditName: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "redditSubreddit",
        message,
        url: url(subredditName),
        getURL: (): string => `https://oauth.reddit.com/r/${encodeURIComponent(subredditName)}/about?raw_json=1`,
        getExtraData: [
            (): string => `https://oauth.reddit.com/r/${encodeURIComponent(subredditName)}/hot?raw_json=1&limit=5`
        ],
        connectionName: "reddit",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, subredditName, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);
}

export function url(subredditName: string): string {

    return `https://reddit.com/r/${subredditName}`;
}