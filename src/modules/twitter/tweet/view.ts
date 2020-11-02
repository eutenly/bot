import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import user, { url as userURL } from "../user/main";
import tweet, { url as tweetURL } from "./main";
import { TwitterTweet } from "./parse";

export default function view(data: TwitterTweet | undefined, message: Message): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // User
    if (input.toLowerCase().replace(/\s+/g, "") === "user") return {
        module: () => user(message, data.user.id, "id"),
        url: userURL(data.user.id)
    };

    // Quoted tweet
    if (input.toLowerCase().replace(/\s+/g, "") === "quotedtweet") {

        // No quoted tweet
        if (!data.quotedTweet) return { error: ":x:  **|  That tweet doesn't have a quoted tweet**" };

        // View tweet
        return {
            module: () => tweet(message, data.quotedTweet?.id || "", data.quotedTweet?.user.handle || ""),
            url: tweetURL(data.quotedTweet.user.handle, data.quotedTweet.id)
        };
    }

    // Invalid type
    else return { error: ":x:  **|  That's not something you can view**" };
}