import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { TwitterSearchResult } from "./parse";

export default function embed(command: Command, data: TwitterSearchResult[]): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("Twitter Timeline", "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png")
        .setDescription(`Page ${command.pageManager?.page}`)
        .setColor(0x1da1f2)
        .setBranding();

    // No data
    if (data.length === 0) return embed
        .setDescription("There aren't that many Tweets")
        .setColor(0xf44242);

    // Build embed
    if (command.pageManager?.input === "home") embed.setAuthor("Timeline", "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png", "https://twitter.com");
    else embed
        .setAuthor(`${data[0].user.name} (@${data[0].user.handle})`, "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png", `https://twitter.com/${data[0].user.handle}`)
        .setDescription(data[0].user.bio)
        .addField(null, null, true)
        .addField("Link", `[twitter.com...](https://twitter.com/${data[0].user.handle})`, true)
        .addField(null, null, true);

    data.forEach((d: TwitterSearchResult, i: number) => embed.addField(null, `**${i + 1}. [${d.user.name} (@${d.user.handle})](https://twitter.com/${d.user.handle}/status/${d.id})**\n${d.text.replace(/\n/g, " ")}\n**${d.likes.toLocaleString()} Like${d.likes === 1 ? "" : "s"} \u2022 ${d.retweets.toLocaleString()} Retweet${d.retweets === 1 ? "" : "s"}**`));

    if (command.compactMode) embed.addField(null, `*\u2022 React or use the \`${prefix}next\` and \`${prefix}previous\` commands to cycle through pages\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result*`);
    else embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}