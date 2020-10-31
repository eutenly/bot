import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import { YouTubeSearchResult } from "./parse";

export default function embed(command: Command, data: YouTubeSearchResult[]): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor(`YouTube Search: ${command.searchManager?.input}`, "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/youtube-red-square.png")
        .setDescription(`Page ${command.searchManager?.page}`)
        .setColor(0xff0000)
        .setBranding();

    // No data
    if (data.length === 0) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    data.forEach((d: YouTubeSearchResult, i: number) => {

        /**
         * Video
         *
         * **1. [How Google Search Works](https://youtube.com/watch?v=0eKVizvYSUQ)**
         * A short video about how Google Search works, including how Google's software indexes the web, ranks sites, and flags spam.
         * [Google](https://youtube.com/channel/UCK8sQmJBp8GCxrOtXWBpyEA) - Uploaded On Thursday, October 24, 2019 at 2:57:25 PM (GMT+0000, UTC)
         */
        if (d.type === "video") embed.addField(null, `**${i + 1}. [${d.title}](https://youtube.com/watch?v=${d.id})**\n${d.description}\n[${d.channel.name}](https://youtube.com/channel/${d.channel.id}) - Uploaded ${parseDate(d.createdAt)}`);

        /**
         * Channel
         *
         * **1. [Google](https://youtube.com/channel/UCK8sQmJBp8GCxrOtXWBpyEA)**
         * Experience the world of Google on our official YouTube channel. Watch videos about our products, technology, company happenings and more.
         */
        else if (d.type === "channel") embed.addField(null, `**${i + 1}. [${d.title}](https://youtube.com/channel/${d.id})**\n${d.description}`);

        /**
         * Playlist
         *
         * **1. [Grow with Google](https://youtube.com/playlist?list=PL590L5WQmH8dZDSVW0XQeRqZvUbwb_8tP)**
         * To find free training, tools and events to help you grow your skills, career, or business, visit https://google.com/grow.
         * [Google](https://youtube.com/channel/UCK8sQmJBp8GCxrOtXWBpyEA)
         */
        else if (d.type === "playlist") embed.addField(null, `**${i + 1}. [${d.title}](https://youtube.com/playlist?list=${d.id})**\n${d.description}\n[${d.channel.name}](https://youtube.com/channel/${d.channel.id})`);
    });

    if (command.compactMode) embed.addField(null, `*\u2022 React or use the \`${prefix}next\` and \`${prefix}previous\` commands to cycle through pages\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result*`);
    else embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}