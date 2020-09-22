import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import videos, { url as videosURL } from "../videos/main";
import { YouTubeChannel } from "./parse";

export default function view(data: YouTubeChannel | undefined, message: Message): ViewData | undefined {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Videos
    if (input.toLowerCase().replace(/\s+/g, "") === "videos") return {
        module: () => videos(message, data.id),
        url: videosURL(data.id)
    };

    // Invalid type
    else return { error: `:x:  **|  You can view this channel's videos with \`${prefix}view videos\`**` };
}