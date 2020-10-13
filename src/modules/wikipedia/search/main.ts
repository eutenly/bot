import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, query: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "search",
        type: "wikipedia",
        message,
        input: query,
        url: url(query),
        getURL: (query: string = "", page: number = 1): string => `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=5&sroffset=${(page - 1) * 5}`,
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, query, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);

    // Return
    return command;
}

export function url(query: string): string {

    return `eutenly://wikipedia/search?query=${encodeURIComponent(query)}`;
}