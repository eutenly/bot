import Embed from "../../classes/Embed/Embed";
import Message from "../../classes/Message/Message";
import linkChecker from "../linkCheckers/youtube";
import search from "./search/main";

export default async function main(message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Get input
    const input = message.content.split(" ").slice(1).join(" ");

    // No input
    if (!input) {

        // Embed
        const embed: Embed = new Embed()
            .setAuthor("YouTube", "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/youtube-red-square.png")
            .setColor(0xff0000)
            .addField("Search YouTube", `Use the \`${prefix}youtube <Search Query>\` command to search for YouTube videos, channels, and playlists`)
            .addField("View Detailed Information", "View more info about a video, channel, or playlist to get detailed information")
            .addField("View a Channel's Videos", `When viewing a channel, use the \`${prefix}view videos\` command to view that channel's videos`)
            .addField("Ready to Try It?", `Search for something with the \`${prefix}youtube <Search Query>\` command`)
            .setBranding();

        // Send
        return message.channel.sendMessage(embed);
    }

    // Link checker
    const runModule: Function | undefined = linkChecker(input);
    if (runModule) return runModule(message);

    // Search
    search(message, input);
}