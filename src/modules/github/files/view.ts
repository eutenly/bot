import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import file from "../file/main";
import files from "../files/main";
import { GitHubSearchResult } from "./parse";

export default function view(data: GitHubSearchResult[], message: Message, command: Command) {

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Previous directory
    if ((command.metadata.path) && (parseInt(input) === 1)) return files(message, command.metadata.ownerName, command.metadata.name, command.metadata.path.split("/").slice(0, command.metadata.path.split("/").length - 1).join("/"));

    // Get result number
    const resultNumber: number = parseInt(input) - (command.metadata.path ? 1 : 0);
    if ((!resultNumber) || (resultNumber < 1)) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Get result
    const result: GitHubSearchResult = data[resultNumber - 1];
    if (!result) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // View file
    if (result.type === "dir") files(message, command.metadata.ownerName, command.metadata.name, result.path);
    else file(message, command.metadata.ownerName, command.metadata.name, result.path);
}