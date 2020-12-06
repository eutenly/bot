import Command, { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import repo, { url as repoURL } from "../repo/main";
import { Languages } from "../types";

export default function view(data: Languages | undefined, message: Message, command: Command): ViewData | undefined {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // No data
    if (!data) return;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Repo
    if (input.toLowerCase().replace(/\s+/g, "") === "repo") return {
        module: () => repo(message, command.metadata.ownerName, command.metadata.name),
        url: repoURL(command.metadata.ownerName, command.metadata.name)
    };

    // Invalid type
    return { error: `:x:  **|  You can view the repo with \`${prefix}view repo\`**` };
}