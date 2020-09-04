import Command from "../../classes/Command/Command";
import Message from "../../classes/Message/Message";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function google(message: Message, query: string) {

    // Create command
    const command = new Command(message.client, {
        name: "google",
        message,
        webScraper: true,
        searchQuery: query,
        getURL: (query: string, page: number): string => `https://google.com/search?q=${encodeURIComponent(query)}&num=5&start=${(page - 1) * 5}`,
        parser: parse,
        getEmbed: embed,
        view
    });

    // Search
    command.searchManager.setPage(1);
}