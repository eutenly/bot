import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, ownerName: string, name: string, prNumber: number, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "githubPR",
        message,
        metadata: {
            ownerName,
            name
        },
        url: url(ownerName, name, prNumber),
        getURL: (): string => `https://api.github.com/repos/${encodeURIComponent(ownerName)}/${encodeURIComponent(name)}/pulls/${encodeURIComponent(prNumber)}`,
        connectionName: "github",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, ownerName, name, prNumber, chIndex), commandHistoryIndex);
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

export function url(ownerName: string, name: string, prNumber: number): string {

    return `https://github.com/${ownerName}/${name}/pulls/${prNumber}`;
}