import Command, { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import gist, { url as gistURL } from "../gist/main";
import { GitHubSearchResult } from "./parse";

export default function view(data: GitHubSearchResult[], message: Message, command: Command): ViewData | undefined {

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: GitHubSearchResult = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View gist
    return {
        module: () => gist(message, command.metadata.name, result.id),
        url: gistURL(command.metadata.name, result.id)
    };
}