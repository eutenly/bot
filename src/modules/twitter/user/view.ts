import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import timeline, { url as timelineURL } from "../timeline/main";
import { TwitterUser } from "./parse";

export default function view(data: TwitterUser | undefined, message: Message): ViewData | undefined {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Tweets
    if (input.toLowerCase().replace(/\s+/g, "") === "tweets") return {
        module: () => timeline(message, data.id),
        url: timelineURL(data.id)
    };

    // Invalid type
    else return { error: `:x:  **|  You can view this user's tweets with the \`${prefix}view tweets\` command**` };
}