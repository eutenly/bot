import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import subreddit, { url as subredditURL } from "../subreddit/main";
import { Post } from "../types";
import user, { url as userURL } from "../user/main";

export default function view(data: Post | undefined, userRequest: UserRequest): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Subreddit
    if (input.toLowerCase().replace(/\s+/g, "") === "subreddit") return {
        module: () => subreddit(userRequest, data.subredditName),
        url: subredditURL(data.subredditName)
    };

    // User
    else if (input.toLowerCase().replace(/\s+/g, "") === "user") return {
        module: () => user(userRequest, data.user),
        url: userURL(data.user)
    };

    // Invalid type
    return { error: ":x:  **|  That's not something you can view**" };
}