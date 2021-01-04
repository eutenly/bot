import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import truncateString from "../../../util/truncateString";
import { BasicPost, Home } from "../types";

export default function embed(command: Command, data?: Home): Embed {

    // Get prefix
    const prefix: string = command.userRequest.channel.prefix;

    // Embed
    command.noData = !data;
    if (!data) return new Embed();

    const posts: BasicPost[] = command.compactMode ? data.posts.slice(0, 3) : data.posts;
    const feed: BasicPost[] = command.compactMode ? data.feed.slice(0, 3) : data.feed;

    const embed = new Embed()
        .setAuthor("Reddit", "https://i.imgur.com/YKUi7bl.png")
        .setColor(0xff3f18)
        .addField(null, null, true)
        .addField("Karma", `Post Karma: **${data.postKarma.toLocaleString()}**\nComment Karma: **${data.commentKarma.toLocaleString()}**\nAwardee Karma: **${data.awardeeKarma.toLocaleString()}**\nAwarder Karma: **${data.awarderKarma.toLocaleString()}**\n**Total Karma: ${data.totalKarma.toLocaleString()}**`, true)
        .addField(null, null, true)
        .addField("Your Posts", `${posts.map((p: BasicPost, i: number) => `**p-${i + 1}. [${truncateString(p.title, 35)}](https://reddit.com/r/${p.subredditName}/comments/${p.id})** | ${p.score.toLocaleString()} Point${p.score === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Post Number>\` to view a post\n\u2022 Use \`${prefix}view posts\` to view more of your posts\n\u200b`)
        .addField("Your Feed", `${feed.map((p: BasicPost, i: number) => `**f-${i + 1}. [${truncateString(p.title, 35)}](https://reddit.com/r/${p.subredditName}/comments/${p.id})** | ${p.score.toLocaleString()} Point${p.score === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Post Number>\` to view a post\n\u2022 Use \`${prefix}reddit feed\` to view more of your feed's posts\n\u200b`)
        .setBranding();

    // Return
    return embed;
}