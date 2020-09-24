import Message from "../../classes/Message/Message";
import helpEmbed from "./helpEmbed";
import search from "./search";

export default async function main(message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Get query
    const query = message.content.split(" ").slice(1).join(" ");

    // No query
    if (!query) return message.channel.sendMessage(helpEmbed(prefix));

    // Run module
    search(message, query);
}