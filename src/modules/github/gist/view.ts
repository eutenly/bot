import Message from "../../../classes/Message/Message";
import gists from "../gists/main";
import user from "../user/main";
import { GitHubGist } from "./parse";

export default function view(data: GitHubGist | undefined, message: Message, metadata: any) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // User
    if (input.toLowerCase().replace(/\s+/g, "") === "user") return user(message, metadata.name);

    // Gists
    else if (input.toLowerCase().replace(/\s+/g, "") === "gists") return gists(message, metadata.name);

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  That's not something you can view**`);
}