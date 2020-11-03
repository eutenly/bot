import Command, { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import file, { url as fileURL } from "../file/main";
import files, { url as filesURL } from "../files/main";
import { GitHubSearchResult } from "./parse";

export default function view(data: GitHubSearchResult[], message: Message, command: Command): ViewData | undefined {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Previous directory
    if ((command.metadata.path) && (parseInt(input) === 1)) return {
        module: () => files(message, command.metadata.ownerName, command.metadata.name, command.metadata.path.split("/").slice(0, command.metadata.path.split("/").length - 1).join("/")),
        url: filesURL(command.metadata.ownerName, command.metadata.name, command.metadata.path.split("/").slice(0, command.metadata.path.split("/").length - 1).join("/"))
    };

    // Get result number
    const resultNumber: number = parseInt(input) - (command.metadata.path ? 1 : 0);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: GitHubSearchResult = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View file
    if (result.type === "dir") return {
        module: () => files(message, command.metadata.ownerName, command.metadata.name, result.path),
        url: filesURL(command.metadata.ownerName, command.metadata.name, result.path)
    };
    else return {
        module: () => file(message, command.metadata.ownerName, command.metadata.name, result.path),
        url: fileURL(command.metadata.ownerName, command.metadata.name, result.path)
    };
}