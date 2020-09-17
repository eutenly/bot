import Message from "../../classes/Message/Message";
import linkChecker from "../linkCheckers/twitter";
import search from "./search/main";

export default async function main(message: Message) {

    // Get input
    const input = message.content.split(" ").slice(1).join(" ");

    // No input
    if (!input) return message.channel.sendMessage(":x:  **|  What would you like to search?**");

    // Link checker
    const runModule: Function | undefined = linkChecker(input);
    if (runModule) return runModule(message);

    // Search
    search(message, input);
}