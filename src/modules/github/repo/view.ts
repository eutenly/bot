import Message from "../../../classes/Message/Message";
import events from "../events/main";
import files from "../files/main";
import issues from "../issues/main";
import languages from "../languages/main";
import prs from "../prs/main";
import releases from "../releases/main";
import user from "../user/main";
import { GitHubRepo } from "./parse";

export default function view(data: GitHubRepo | undefined, message: Message) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Languages
    if (input.toLowerCase().replace(/\s+/g, "") === "languages") return languages(message, data.ownerName, data.name);

    // User
    else if (input.toLowerCase().replace(/\s+/g, "") === "user") return user(message, data.ownerName);

    // Files
    else if (input.toLowerCase().replace(/\s+/g, "") === "files") return files(message, data.ownerName, data.name);

    // Issues
    else if (input.toLowerCase().replace(/\s+/g, "") === "issues") return issues(message, data.ownerName, data.name);

    // Pull requests
    else if (["pullrequests", "prs"].includes(input.toLowerCase().replace(/\s+/g, ""))) return prs(message, data.ownerName, data.name);

    // Releases
    else if (input.toLowerCase().replace(/\s+/g, "") === "releases") return releases(message, data.ownerName, data.name);

    // Events
    else if (input.toLowerCase().replace(/\s+/g, "") === "events") return events(message, `${data.ownerName}/${data.name}`, "repo");

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  That's not something you can view**`);
}