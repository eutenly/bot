import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import truncateString from "../../../util/truncateString";
import { RedditPost } from "./parse";

export default function embed(command: Command, data?: RedditPost): Embed {

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
        .setAuthor(truncateString(data.title, 50), "https://i.imgur.com/YKUi7bl.png", `https://reddit.com/r/${data.subredditName}/comments/${data.id}`)
        .setDescription(`${(data.nsfw || data.spoiler) ? "||" : ""}${truncateString(data.text, 500)}${(data.nsfw || data.spoiler) ? "||" : ""}`)
        .addField(null, null, true)
        .addField("Link", `[reddit.com...](https://reddit.com/r/${data.subredditName}/comments/${data.id})`, true)
        .addField(null, null, true)
        .addField("Comments", data.comments.toLocaleString(), true)
        .addField("Score", data.score.toLocaleString(), true)
        .addField("Awards", data.awards.toLocaleString(), true)
        .addField("NSFW", data.nsfw ? "Yes" : "No", true)
        .addField("Subreddit", `r/${data.subredditName}\n(\`${prefix}view subreddit\`)`, true)
        .addField("Spoiler", data.spoiler ? "Yes" : "No", true)
        .addField("Posted", parseDate(data.postedAt))
        .addField()
        .addField("User", `View info about the person who created this post with the \`${prefix}view user\` command`)
        .setImage(data.image);

    // Return
    return embed;
}