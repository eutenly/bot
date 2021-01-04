import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import post, { url as postURL } from "../post/main";
import posts, { url as postsURL } from "../posts/main";
import { BasicPost, Home } from "../types";

export default function view(data: Home | undefined, userRequest: UserRequest): ViewData | undefined {

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

    // Get item type
    const itemType: string = input.split("-")[0].toLowerCase();
    if (!["p", "f"].includes(itemType)) return { error: ":x:  **|  That's not something you can view**" };

    // Get item number
    const itemNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if (!itemNumber) return { error: ":x:  **|  That's not something you can view**" };
    if (itemNumber < 1) return { error: ":x:  **|  That item number is invalid**" };

    // Get item
    let itemResult: BasicPost | undefined;
    if (itemType === "p") itemResult = data.posts[itemNumber - 1];
    else if (itemType === "f") itemResult = data.feed[itemNumber - 1];

    if (!itemResult) return { error: ":x:  **|  That item number is invalid**" };

    // Run module
    if (itemType === "p") return {
        module: () => post(userRequest, itemResult?.id || "", itemResult?.subredditName || ""),
        url: postURL(itemResult.id, itemResult.id)
    };
    else if (itemType === "f") return {
        module: () => post(userRequest, itemResult?.id || "", itemResult?.subredditName || ""),
        url: postURL(itemResult.id, itemResult.id)
    };
}