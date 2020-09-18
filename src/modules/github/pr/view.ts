import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import prs from "../prs/main";
import repo from "../repo/main";
import user from "../user/main";
import { GitHubPR } from "./parse";

export default function view(data: GitHubPR | undefined, message: Message, command: Command) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // User
    if (input.toLowerCase().replace(/\s+/g, "") === "user") return user(message, data.user);

    // Repo
    else if (input.toLowerCase().replace(/\s+/g, "") === "repo") return repo(message, command.metadata.ownerName, command.metadata.name);

    // Pull requests
    else if (["pullrequests", "prs"].includes(input.toLowerCase().replace(/\s+/g, ""))) return prs(message, command.metadata.ownerName, command.metadata.name);

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  That's not something you can view**`);
}