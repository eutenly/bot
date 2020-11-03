import Command, { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import post, { url as postURL } from "../post/main";
import { RedditPost } from "./parse";

export default function view(data: RedditPost[], message: Message, command: Command): ViewData | undefined {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: RedditPost = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View post
    return {
        module: () => post(message, result.id, result.subredditName),
        url: postURL(result.id, result.subredditName)
    };
}