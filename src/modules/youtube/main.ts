import Message from "../../classes/Message/Message";
import helpEmbed from "./helpEmbed";
import linkChecker from "./linkChecker";
import search from "./search/main";

export default async function main(message: Message) {

    // Get prefix
    const prefix: string = message.channel.prefix;

    // Get input
    const input = message.commandContent.split(" ").slice(1).join(" ");

    // No input
    if (!input) return message.channel.sendMessage(helpEmbed(prefix));

    // Link checker
    const runModule: Function | undefined = linkChecker(input);
    if (runModule) return runModule(message);

    // Search
    search(message, input);
}