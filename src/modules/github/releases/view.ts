import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import release from "../release/main";
import { GitHubSearchResult } from "./parse";

export default function view(data: GitHubSearchResult[], message: Message, command: Command) {

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Get result
    const result: GitHubSearchResult = data[resultNumber - 1];
    if (!result) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // View release
    release(message, command.metadata.ownerName, command.metadata.name, result.id);
}