import Command, { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import timeline, { url as timelineURL } from "../timeline/main";
import tweet, { url as tweetURL } from "../tweet/main";
import { Home } from "../types";

export default function view(data: Home | undefined, message: Message, command: Command): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Tweets
    if (input.toLowerCase().replace(/\s+/g, "") === "tweets") return {
        module: () => timeline(message, command.message.author.connections["twitter"]?.id || ""),
        url: timelineURL(command.message.author.connections["twitter"]?.id || "")
    };

    // Get item type
    const itemType: string = input.split("-")[0].toLowerCase();
    if (!["t", "tl"].includes(itemType)) return { error: ":x:  **|  That's not something you can view**" };

    // Get item number
    const itemNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if (!itemNumber) return { error: ":x:  **|  That's not something you can view**" };
    if (itemNumber < 1) return { error: ":x:  **|  That item number is invalid**" };

    // Get item
    let itemResult: any;
    if (itemType === "t") itemResult = data.tweets[itemNumber - 1];
    else if (itemType === "tl") itemResult = data.timeline[itemNumber - 1];

    if (!itemResult) return { error: ":x:  **|  That item number is invalid**" };

    // Run module
    if (itemType === "t") return {
        module: () => tweet(message, itemResult.id, itemResult.user.handle),
        url: tweetURL(itemResult.user.handle, itemResult.id)
    };
    else if (itemType === "tl") return {
        module: () => tweet(message, itemResult.id, itemResult.user.handle),
        url: tweetURL(itemResult.user.handle, itemResult.id)
    };
}