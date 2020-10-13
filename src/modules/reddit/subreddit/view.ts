import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import post, { url as postURL } from "../post/main";
import posts, { url as postsURL } from "../posts/main";
import { RedditPost, RedditSubreddit } from "./parse";

export default function view(data: RedditSubreddit | undefined, message: Message): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Posts
    if (input.toLowerCase().replace(/\s+/g, "") === "posts") return {
        module: () => posts(message, data.name, "subreddit"),
        url: postsURL(data.name, "subreddit")
    };

    // Get post number
    const postNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!postNumber) || (postNumber < 1)) return { error: ":x:  **|  That post number is invalid**" };

    // Get post
    const postResult: RedditPost = data.hotPosts[postNumber - 1];
    if (!postResult) return { error: ":x:  **|  That post number is invalid**" };

    // Run module
    return {
        module: () => post(message, postResult.id, data.name),
        url: postURL(postResult.id, data.name)
    };
}