import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import events, { url as eventsURL } from "../events/main";
import gists, { url as gistsURL } from "../gists/main";
import repos, { url as reposURL } from "../repos/main";
import { GitHubUser } from "./parse";

export default function view(data: GitHubUser | undefined, message: Message): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Repos
    if (["repositories", "repos"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => repos(message, data.name),
        url: reposURL(data.name)
    };

    // Gists
    else if (input.toLowerCase().replace(/\s+/g, "") === "gists") return {
        module: () => gists(message, data.name),
        url: gistsURL(data.name)
    };

    // Events
    else if (input.toLowerCase().replace(/\s+/g, "") === "events") return {
        module: () => events(message, data.name, "user"),
        url: eventsURL(data.name)
    };

    // Invalid type
    return { error: ":x:  **|  That's not something you can view**" };
}