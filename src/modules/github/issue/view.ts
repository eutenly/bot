import Command, { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import issues, { url as issuesURL } from "../issues/main";
import repo, { url as repoURL } from "../repo/main";
import user, { url as userURL } from "../user/main";
import { GitHubIssue } from "./parse";

export default function view(data: GitHubIssue | undefined, message: Message, command: Command): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // User
    if (input.toLowerCase().replace(/\s+/g, "") === "user") return {
        module: () => user(message, data.user),
        url: userURL(data.user)
    };

    // Repo
    else if (input.toLowerCase().replace(/\s+/g, "") === "repo") return {
        module: () => repo(message, command.metadata.ownerName, command.metadata.name),
        url: repoURL(command.metadata.ownerName, command.metadata.name)
    };

    // Issues
    else if (input.toLowerCase().replace(/\s+/g, "") === "issues") return {
        module: () => issues(message, command.metadata.ownerName, command.metadata.name),
        url: issuesURL(command.metadata.ownerName, command.metadata.name)
    };

    // Invalid type
    return { error: ":x:  **|  That's not something you can view**" };
}