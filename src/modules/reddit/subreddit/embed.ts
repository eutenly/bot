import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import truncateString from "../../../util/truncateString";
import { BasicPost, Subreddit } from "../types";

export default function embed(command: Command, data?: Subreddit): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("Reddit Subreddit", "https://i.imgur.com/YKUi7bl.png")
        .setColor(0xff3f18)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown subreddit")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(`r/${data.name}`, "https://i.imgur.com/YKUi7bl.png", `https://reddit.com/r/${data.name}`)
        .setDescription(truncateString(data.description, 500))
        .addField(null, null, true)
        .addField("Link", `[reddit.com...](https://reddit.com/r/${data.name})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed.addField(null, `**Subscribers:** ${data.subscribers.toLocaleString()}\n**Online Users:** ${data.onlineUsers.toLocaleString()}\n**NSFW:** ${data.nsfw ? "Yes" : "No"}\n**Created:** ${parseDate(data.createdAt)}`);

    else embed
        .addField("NSFW", data.nsfw ? "Yes" : "No", true)
        .addField("Subscribers", data.subscribers.toLocaleString(), true)
        .addField("Online Users", data.onlineUsers.toLocaleString(), true);

    embed.addField("Hot Posts", `${data.hotPosts.map((p: BasicPost, i: number) => `**p-${i + 1}. [${truncateString(p.title, 35)}](https://reddit.com/r/${data.name}/comments/${p.id})** | ${p.score.toLocaleString()} Point${p.score === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Post Number>\` to view a post\n\u2022 Use \`${prefix}view posts\` to view more posts`);

    if (!command.compactMode) embed.addField("Created", parseDate(data.createdAt));

    // Return
    return embed;
}