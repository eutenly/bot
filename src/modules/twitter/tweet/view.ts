import Message from "../../../classes/Message/Message";
import user from "../user/main";
import tweet from "./main";
import { TwitterTweet } from "./parse";

export default function view(data: TwitterTweet | undefined, message: Message) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // User
    if (input.toLowerCase().replace(/\s+/g, "") === "user") return user(message, data.user.id, "id");

    // Quoted tweet
    if (input.toLowerCase().replace(/\s+/g, "") === "quotedtweet") {

        // No quoted tweet
        if (!data.quotedTweetID) return message.channel.sendMessage(":x:  **|  That tweet doesn't have a quoted tweet**");

        // View tweet
        return tweet(message, data.quotedTweetID);
    }

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  You can view the user${data.quotedTweetID ? " or quoted tweet" : ""}**`);
}