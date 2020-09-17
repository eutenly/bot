import Message from "../../../classes/Message/Message";
import issues from "../issues/main";
import repo from "../repo/main";
import user from "../user/main";
import { GitHubIssue } from "./parse";

export default function view(data: GitHubIssue | undefined, message: Message, metadata: any) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // User
    if (input.toLowerCase().replace(/\s+/g, "") === "user") return user(message, data.user);

    // Repo
    else if (input.toLowerCase().replace(/\s+/g, "") === "repo") return repo(message, metadata.ownerName, metadata.name);

    // Issues
    else if (input.toLowerCase().replace(/\s+/g, "") === "issues") return issues(message, metadata.ownerName, metadata.name);

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  That's not something you can view**`);
}