import Message from "../../classes/Message/Message";
import search from "./search/main";

export default async function main(message: Message) {

    // Get query
    const query = message.content.split(" ").slice(1).join(" ");

    // No query
    if (!query) return message.channel.sendMessage(":x:  **|  What would you like to search?**");

    // Run module
    search(message, query);
}