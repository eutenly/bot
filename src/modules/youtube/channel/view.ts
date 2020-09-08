import Message from "../../../classes/Message/Message";
// import videos from "../videos/main";
import { YouTubeChannel } from "./parse";

export default function view(data: YouTubeChannel | undefined, message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Videos
    // if (input.toLowerCase().replace(/\s+/g, "") === "videos") return videos(message, data.id);

    // Invalid type
    else message.channel.sendMessage(`:x:  **|  You can view this channel's videos with \`${prefix}view videos\`**`);
}