import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import subreddit, { url as subredditURL } from "../subreddit/main";
import user, { url as userURL } from "../user/main";
import { RedditPost } from "./parse";

export default function view(data: RedditPost | undefined, message: Message): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Subreddit
    if (input.toLowerCase().replace(/\s+/g, "") === "subreddit") return {
        module: () => subreddit(message, data.subredditName),
        url: subredditURL(data.subredditName)
    };

    // User
    else if (input.toLowerCase().replace(/\s+/g, "") === "user") return {
        module: () => user(message, data.user),
        url: userURL(data.user)
    };

    // Invalid type
    return { error: ":x:  **|  That's not something you can view**" };
}