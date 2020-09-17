import Message from "../../../classes/Message/Message";
import timeline from "../timeline/main";
import { TwitterUser } from "./parse";

export default function view(data: TwitterUser | undefined, message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Tweets
    if (input.toLowerCase().replace(/\s+/g, "") === "tweets") return timeline(message, data.id);

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  You can view this user's tweets with the \`${prefix}view tweets\` command**`);
}