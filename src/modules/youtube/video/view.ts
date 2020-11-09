import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import channel, { url as channelURL } from "../channel/main";
import { YouTubeVideo } from "./parse";

export default function view(data: YouTubeVideo | undefined, message: Message): ViewData | undefined {

    // Get prefix
    const prefix: string = message.channel.prefix;

    // No data
    if (!data) return;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Channel
    if (input.toLowerCase().replace(/\s+/g, "") === "channel") return {
        module: () => channel(message, data.channel.id),
        url: channelURL(data.channel.id)
    };

    // Embed
    if (input.toLowerCase().replace(/\s+/g, "") === "embed") {
        message.channel.sendMessage(`<:youtube:${message.client.eutenlyEmojis.get("youtube")}>  **|  https://youtube.com/watch?v=${data.id}**`);
        return;
    }

    // Invalid type
    else return { error: `:x:  **|  You can view the channel with \`${prefix}view channel\`**` };
}