import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { ListedTweet } from "../types";

export default function embed(command: Command, data: ListedTweet[]): Embed {

    // Get prefix
    const prefix: string = command.userRequest.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor(`Twitter Search: ${command.pageManager?.input}`, "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png")
        .setDescription(`Page ${command.pageManager?.page}`)
        .setColor(0x1da1f2)
        .setBranding();

    // No data
    command.noData = data.length === 0;
    if (data.length === 0) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    data.forEach((d: ListedTweet, i: number) => embed.addField(null, `**${i + 1}. [${d.user.name} (@${d.user.handle})](https://twitter.com/${d.user.handle}/status/${d.id})**\n${d.text.replace(/\n/g, " ")}\n**${d.likes.toLocaleString()} Like${d.likes === 1 ? "" : "s"} \u2022 ${d.retweets.toLocaleString()} Retweet${d.retweets === 1 ? "" : "s"}**`));

    if (command.compactMode) embed.addField(null, "*\u2022 React or use the `/next` and `/previous` commands to cycle through pages\n\u2022 Use the `/view` command to get more info about a result*");
    else embed
        .addField()
        .addField("Navigation", "\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the `/next` and `/previous` commands\n\u2022 Use the `/view` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*")
        .addField();

    // Return
    return embed;
}