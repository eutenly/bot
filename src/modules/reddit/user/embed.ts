import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import truncateString from "../../../util/truncateString";
import { RedditPost, RedditUser } from "./parse";

export default function embed(command: Command, data?: RedditUser): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("Reddit Search", "https://i.imgur.com/YKUi7bl.png")
        .setColor(0xff3f18)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    const posts: RedditPost[] = command.compactMode ? data.posts.slice(0, 3) : data.posts;

    embed
        .setAuthor(`u/${data.name}`, "https://i.imgur.com/YKUi7bl.png", `https://reddit.com/u/${data.name}`)
        .setDescription(data.bio)
        .addField(null, null, true)
        .addField("Link", `[reddit.com...](https://reddit.com/u/${data.name})`, true)
        .addField(null, null, true)
        .addField("Karma", `Post Karma: **${data.postKarma.toLocaleString()}**\nComment Karma: **${data.commentKarma.toLocaleString()}**\nAwardee Karma: **${data.awardeeKarma.toLocaleString()}**\nAwarder Karma: **${data.awarderKarma.toLocaleString()}**\n**Total Karma: ${data.totalKarma.toLocaleString()}**`, true)
        .addField("Has Premium", data.hasPremium ? "Yes" : "No", true)
        .addField("Posts", `${posts.map((p: RedditPost, i: number) => `**p-${i + 1}. [${truncateString(p.title, 35)}](https://reddit.com/r/${data.name}/comments/${p.id})** - ${p.score.toLocaleString()} Point${p.score === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Post Number>\` to view a post\n\u2022 Use \`${prefix}view posts\` to view more posts`)
        .addField("Created", parseDate(data.createdAt));

    // Return
    return embed;
}