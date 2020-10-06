import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import post, { url as postURL } from "../post/main";
import posts, { url as postsURL } from "../posts/main";
import { RedditPost, RedditUser } from "./parse";

export default function view(data: RedditUser | undefined, message: Message): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Posts
    if (input.toLowerCase().replace(/\s+/g, "") === "posts") return {
        module: () => posts(message, data.name, "user"),
        url: postsURL(data.name, "user")
    };

    // Get post number
    const postNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!postNumber) || (postNumber < 1)) return { error: ":x:  **|  That post number is invalid**" };

    // Get post
    const postResult: RedditPost = data.posts[postNumber - 1];
    if (!postResult) return { error: ":x:  **|  That post number is invalid**" };

    // Run module
    return {
        module: () => post(message, postResult.id, data.name),
        url: postURL(postResult.id, data.name)
    };
}