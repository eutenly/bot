import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import { Channel } from "../types";
import videos, { url as videosURL } from "../videos/main";

export default function view(data: Channel | undefined, message: Message): ViewData | undefined {

    // Get prefix
    const prefix: string = message.channel.prefix;

    // No data
    if (!data) return;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Videos
    if (["videos", "vids"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => videos(message, data.id),
        url: videosURL(data.id)
    };

    // Invalid type
    else return { error: `:x:  **|  You can view this channel's videos with \`${prefix}view videos\`**` };
}