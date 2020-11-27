import Command, { ViewDataURL } from "../../classes/Command/Command";
import Message from "../../classes/Message/Message";
import embed from "./embed";
import fetch from "./fetch";
import parse from "./parse";
import view from "./view";

export default async function search(message: Message, query: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "search",
        category: "search",
        message,
        webScraper: true,
        input: query,
        url: url(query),
        getData: (query: string = "", page: number = 1): string => `https://bing.com/search?q=${encodeURIComponent(query)}&first=${(page - 1) * 5}`,
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => search(m, query, chIndex), commandHistoryIndex);

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(query: string): ViewDataURL {

    return {
        title: "Search",
        description: query,
        url: `eutenly://search?query=${encodeURIComponent(query)}`
    };
}