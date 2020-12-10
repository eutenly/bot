import Message from "../../classes/Message/Message";
import helpEmbed from "./helpEmbed";
import search from "./search";
import searchLastMessage from "./searchLastMessage";

export default async function main(message: Message) {

    // Get prefix
    const prefix: string = message.channel.prefix;

    // Get query
    const query = message.commandContent.split(" ").slice(1).join(" ");

    // No query
    if (!query) return message.channel.sendMessage(helpEmbed(prefix));

    // Check if input is to search last message
    if (query === "^") return searchLastMessage(message);

    // Run module
    search(message, query);
}