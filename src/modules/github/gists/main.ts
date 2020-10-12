import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, name: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "gists",
        type: "github",
        message,
        input: name,
        metadata: {
            name
        },
        url: url(name),
        getURL: (input: string = "", page: number = 1): string => `https://api.github.com/users/${encodeURIComponent(name)}/gists?per_page=5${page ? `&page=${page}` : ""}`,
        connectionName: "github",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, name, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);

    // Return
    return command;
}

export function url(name: string): string {

    return `https://gist.github.com/${name}`;
}