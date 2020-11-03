import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import events, { url as eventsURL } from "../events/main";
import files, { url as filesURL } from "../files/main";
import issues, { url as issuesURL } from "../issues/main";
import languages, { url as languagesURL } from "../languages/main";
import prs, { url as prsURL } from "../prs/main";
import releases, { url as releasesURL } from "../releases/main";
import user, { url as userURL } from "../user/main";
import { GitHubRepo } from "./parse";

export default function view(data: GitHubRepo | undefined, message: Message): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Languages
    if (input.toLowerCase().replace(/\s+/g, "") === "languages") return {
        module: () => languages(message, data.ownerName, data.name),
        url: languagesURL(data.ownerName, data.name)
    };

    // User
    else if (input.toLowerCase().replace(/\s+/g, "") === "user") return {
        module: () => user(message, data.ownerName),
        url: userURL(data.ownerName)
    };

    // Files
    else if (input.toLowerCase().replace(/\s+/g, "") === "files") return {
        module: () => files(message, data.ownerName, data.name),
        url: filesURL(data.ownerName, data.name)
    };

    // Issues
    else if (input.toLowerCase().replace(/\s+/g, "") === "issues") return {
        module: () => issues(message, data.ownerName, data.name),
        url: issuesURL(data.ownerName, data.name)
    };

    // Pull requests
    else if (["pullrequests", "prs"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => prs(message, data.ownerName, data.name),
        url: prsURL(data.ownerName, data.name)
    };

    // Releases
    else if (input.toLowerCase().replace(/\s+/g, "") === "releases") return {
        module: () => releases(message, data.ownerName, data.name),
        url: releasesURL(data.ownerName, data.name)
    };

    // Events
    else if (input.toLowerCase().replace(/\s+/g, "") === "events") return {
        module: () => events(message, `${data.ownerName}/${data.name}`, "repo"),
        url: eventsURL(`${data.ownerName}/${data.name}`)
    };

    // Invalid type
    return { error: ":x:  **|  That's not something you can view**" };
}