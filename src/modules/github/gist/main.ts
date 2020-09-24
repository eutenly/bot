import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, name: string, gistID: number, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "githubGist",
        message,
        metadata: {
            name
        },
        url: url(name, gistID),
        getURL: (): string => `https://api.github.com/gists/${encodeURIComponent(gistID)}`,
        connectionName: "github",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, name, gistID, chIndex), commandHistoryIndex);
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

export function url(name: string, gistID: number): string {

    return `https://gist.github.com/${name}/${gistID}`;
}