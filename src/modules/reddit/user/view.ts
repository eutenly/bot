import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import post, { url as postURL } from "../post/main";
import posts, { url as postsURL } from "../posts/main";
import { BasicPost, User } from "../types";

export default function view(data: User | undefined, userRequest: UserRequest): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Posts
    if (input.toLowerCase().replace(/\s+/g, "") === "posts") return {
        module: () => posts(userRequest, data.name, "user"),
        url: postsURL(data.name, "user")
    };

    // Get post number
    const postNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!postNumber) || (postNumber < 1)) return { error: ":x:  **|  That post number is invalid**" };

    // Get post
    const postResult: BasicPost = data.posts[postNumber - 1];
    if (!postResult) return { error: ":x:  **|  That post number is invalid**" };

    // Run module
    return {
        module: () => post(userRequest, postResult.id, postResult.subredditName),
        url: postURL(postResult.id, data.name)
    };
}