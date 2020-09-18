import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import repo from "../repo/main";
import { GitHubLanguages } from "./parse";

export default function view(data: GitHubLanguages | undefined, message: Message, command: Command) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Repo
    if (input.toLowerCase().replace(/\s+/g, "") === "repo") return repo(message, command.metadata.ownerName, command.metadata.name);

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  You can view the repo with \`${prefix}view repo\`**`);
}