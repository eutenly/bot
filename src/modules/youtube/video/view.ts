import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import channel, { url as channelURL } from "../channel/main";
import { YouTubeVideo } from "./parse";

export default function view(data: YouTubeVideo | undefined, message: Message): ViewData | undefined {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Channel
    if (input.toLowerCase().replace(/\s+/g, "") === "channel") return {
        module: () => channel(message, data.channel.id),
        url: channelURL(data.channel.id)
    };

    // Invalid type
    else return { error: `:x:  **|  You can view the channel with \`${prefix}view channel\`**` };
}