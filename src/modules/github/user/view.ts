import Message from "../../../classes/Message/Message";
import events from "../events/main";
import gists from "../gists/main";
import repos from "../repos/main";
import { GitHubUser } from "./parse";

export default function view(data: GitHubUser | undefined, message: Message) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Repos
    if (["repositories", "repos"].includes(input.toLowerCase().replace(/\s+/g, ""))) return repos(message, data.name);

    // Gists
    else if (input.toLowerCase().replace(/\s+/g, "") === "gists") return gists(message, data.name);

    // Events
    else if (input.toLowerCase().replace(/\s+/g, "") === "events") return events(message, data.name, "user");

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  That's not something you can view**`);
}