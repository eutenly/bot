import Command from "../../classes/Command/Command";
import Message from "../../classes/Message/Message";
import embed from "./embed";
import parse from "./parse";

export default async function main(message: Message) {

    // Get query
    const query = message.content.split(" ").slice(1).join(" ");

    // No query
    if (!query) return message.channel.sendMessage(":x:  **|  What would you like to search?**");

    // Create command
    const command = new Command(message.client, {
        name: "google",
        message,
        webScraper: true,
        searchQuery: query,
        getURL: (query: string, page: number): string => `https://google.com/search?q=${encodeURIComponent(query)}&num=5&start=${(page - 1) * 5}`,
        parser: parse,
        getEmbed: embed
    });

    // Search
    command.searchManager.setPage(1);
}