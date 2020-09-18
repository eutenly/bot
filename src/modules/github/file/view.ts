import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import repo from "../repo/main";
import { GitHubFile } from "./parse";

export default function view(data: GitHubFile | undefined, message: Message, command: Command) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Repo
    else if (input.toLowerCase().replace(/\s+/g, "") === "repo") return repo(message, command.metadata.ownerName, command.metadata.name);

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  That's not something you can view**`);
}