import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import timeline from "../timeline/main";
import tweet from "../tweet/main";
import { TwitterHome } from "./parse";

export default function view(data: TwitterHome | undefined, message: Message, command: Command) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  What would you like to view?**");

    // Tweets
    if (input.toLowerCase().replace(/\s+/g, "") === "tweets") return timeline(message, command.message.author.connections["twitter"]?.id || "");

    // Get item type
    const itemType: string = input.split("-")[0].toLowerCase();
    if (!["t", "tl"].includes(itemType)) return message.channel.sendMessage(":x:  **|  That's not something you can view**");

    // Get item number
    const itemNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if (!itemNumber) return message.channel.sendMessage(":x:  **|  That's not something you can view**");
    if (itemNumber < 1) return message.channel.sendMessage(":x:  **|  That item number is invalid**");

    // Get item
    let itemResult: any;
    if (itemType === "t") itemResult = data.tweets[itemNumber - 1];
    else if (itemType === "tl") itemResult = data.timeline[itemNumber - 1];

    if (!itemResult) return message.channel.sendMessage(":x:  **|  That item number is invalid**");

    // Run module
    if (itemType === "t") tweet(message, itemResult.id);
    else if (itemType === "tl") tweet(message, itemResult.id);
}