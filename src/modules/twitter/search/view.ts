import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import tweet, { url as tweetURL } from "../tweet/main";
import { ListedTweet } from "../types";

export default function view(data: ListedTweet[], message: Message): ViewData | undefined {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: ListedTweet = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View tweet
    return {
        module: () => tweet(message, result.id, result.user.handle),
        url: tweetURL(result.user.handle, result.id)
    };
}