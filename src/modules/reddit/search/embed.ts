import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import truncateString from "../../../util/truncateString";
import { RedditSearchResult } from "./parse";

export default function embed(command: Command, data: RedditSearchResult[]): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor(`Reddit Search: ${command.pageManager?.input}`, "https://i.imgur.com/YKUi7bl.png")
        .setDescription(`Page ${command.pageManager?.page}`)
        .setColor(0xff3f18)
        .setBranding();

    // No data
    if (data.length === 0) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    data.forEach((d: RedditSearchResult, i: number) => embed.addField(null, `**${i + 1}. [${d.score.toLocaleString()}] [${truncateString(d.title, 50)}](https://reddit.com/r/${d.subredditName}/comments/${d.id})** - [r/${d.subredditName}](https://reddit.com/r/${d.subredditName})\n${d.text ? `${(d.nsfw || d.spoiler) ? "||" : ""}${truncateString(d.text.replace(/\n/g, " "), 200)}${(d.nsfw || d.spoiler) ? "||" : ""}\n` : ""}**[u/${d.user}](https://reddit.com/u/${d.user}) \u2022 ${d.comments.toLocaleString()} Comment${d.comments === 1 ? "" : "s"} \u2022 ${d.awards.toLocaleString()} Award${d.awards === 1 ? "" : "s"}**`));

    if (command.compactMode) embed.addField(null, `*\u2022 React or use the \`${prefix}next\` and \`${prefix}previous\` commands to cycle through pages\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result*`);
    else embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}