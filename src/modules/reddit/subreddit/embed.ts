import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import { RedditPost, RedditSubreddit } from "./parse";

export default function embed(command: Command, data?: RedditSubreddit): Embed {

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
    embed
        .setAuthor(`r/${data.name}`, "https://i.imgur.com/YKUi7bl.png", `https://reddit.com/r/${data.name}`)
        .setDescription(`${data.description.substring(0, 500)}${data.description.length > 500 ? "..." : ""}`)
        .addField(null, null, true)
        .addField("Link", `[reddit.com...](https://reddit.com/r/${data.name})`, true)
        .addField(null, null, true)
        .addField("NSFW", data.nsfw ? "Yes" : "No", true)
        .addField("Subscribers", data.subscribers.toLocaleString(), true)
        .addField("Online Users", data.onlineUsers.toLocaleString(), true)
        .addField("Hot Posts", `${data.hotPosts.map((p: RedditPost, i: number) => `**p-${i + 1}. [${p.title.substring(0, 35)}${p.title.length > 35 ? "..." : ""}](https://reddit.com/r/${data.name}/comments/${p.id})** - ${p.score.toLocaleString()} Point${p.score === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Post Number>\` to view a post\n\u2022 Use \`${prefix}view posts\` to view more posts`)
        .addField("Created", parseDate(data.createdAt));

    // Return
    return embed;
}