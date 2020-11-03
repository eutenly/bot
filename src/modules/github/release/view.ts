import Command, { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import releases, { url as releasesURL } from "../releases/main";
import repo, { url as repoURL } from "../repo/main";
import user, { url as userURL } from "../user/main";
import { GitHubRelease } from "./parse";

export default function view(data: GitHubRelease | undefined, message: Message, command: Command): ViewData | undefined {

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

    // Releases
    else if (input.toLowerCase().replace(/\s+/g, "") === "releases") return {
        module: () => releases(message, command.metadata.ownerName, command.metadata.name),
        url: releasesURL(command.metadata.ownerName, command.metadata.name)
    };

    // Invalid type
    return { error: ":x:  **|  That's not something you can view**" };
}