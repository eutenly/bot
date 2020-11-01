import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import truncateString from "../../../util/truncateString";
import { TwitterHome, TwitterTweet } from "./parse";

export default function embed(command: Command, data?: TwitterHome): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    if (!data) return new Embed();
    const embed = new Embed()
        .setAuthor("Twitter", "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png")
        .setColor(0x1da1f2)
        .addField("Your Tweets", `${data.tweets.map((t: TwitterTweet, i: number) => `**t-${i + 1}. [${t.user.name} (@${t.user.handle})](https://twitter.com/${t.user.handle}/status/${t.id})**: ${truncateString(t.text.replace(/\n/g, " "), 50)}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Tweet Number>\` to view a Tweet\n\u2022 Use \`${prefix}view tweets\` to view more of your Tweets\n\u200b`)
        .addField("Your Timeline", `${data.timeline.map((t: TwitterTweet, i: number) => `**tl-${i + 1}. [${t.user.name} (@${t.user.handle})](https://twitter.com/${t.user.handle}/status/${t.id})**: ${truncateString(t.text.replace(/\n/g, " "), 50)}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Tweet Number>\` to view a Tweet\n\u2022 Use \`${prefix}twitter timeline\` to view your timeline\n\u200b`)
        .setBranding();

    // Return
    return embed;
}