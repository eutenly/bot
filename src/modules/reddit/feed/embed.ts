import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { RedditPost } from "./parse";

export default function embed(command: Command, data: RedditPost[]): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("Reddit: Home Feed", "https://i.imgur.com/YKUi7bl.png")
        .setDescription(`Page ${command.searchManager?.page}`)
        .setColor(0xff3f18)
        .setBranding();

    // No data
    if (data.length === 0) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    data.forEach((d: RedditPost, i: number) => embed.addField(null, `**${i + 1}. [${d.score.toLocaleString()}] [${d.title.substring(0, 50)}${d.title.length > 50 ? "..." : ""}](https://reddit.com/r/${d.subredditName}/comments/${d.id})** - [r/${d.subredditName}](https://reddit.com/r/${d.subredditName})\n${d.text ? `${(d.nsfw || d.spoiler) ? "||" : ""}${d.text.replace(/\n/g, " ").substring(0, 200)}${d.text.replace(/\n/g, " ").length > 200 ? "..." : ""}${(d.nsfw || d.spoiler) ? "||" : ""}\n` : ""}**[u/${d.user}](https://reddit.com/u/${d.user}) \u2022 ${d.comments.toLocaleString()} Comment${d.comments === 1 ? "" : "s"} \u2022 ${d.awards.toLocaleString()} Award${d.awards === 1 ? "" : "s"}**`));

    embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}