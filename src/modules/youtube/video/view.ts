import Message from "../../../classes/Message/Message";
import { YouTubeVideo } from "./parse";
// import channel from "../channel/main";

export default function view(data: YouTubeVideo | undefined, message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Channel
    // if (input.toLowerCase().replace(/\s+/g, "") === "channel") return channel(message, data.channel.id);

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  You can view the channel with \`${prefix}view channel\`**`);
}