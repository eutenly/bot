import Command from "../../classes/Command/Command";
import Message from "../../classes/Message/Message";
import embed from "./embed";
import fetch from "./fetch";
import parse from "./parse";
import view from "./view";

export default async function search(message: Message, query: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "search",
        type: "google",
        message,
        webScraper: true,
        input: query,
        url: url(query),
        getURL: (query: string = "", page: number = 1): string => `https://google.com/search?q=${encodeURIComponent(query)}&num=5&start=${(page - 1) * 5}`,
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => search(m, query, chIndex), commandHistoryIndex);

    // Search
    command.searchManager?.setPage(1);

    // Return
    return command;
}

export function url(query: string): string {

    return `eutenly://search?query=${encodeURIComponent(query)}`;
}