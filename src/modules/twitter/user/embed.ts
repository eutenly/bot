import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import { TwitterUser } from "./parse";

export default function embed(command: Command, data?: TwitterUser): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("Twitter Search", "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png")
        .setColor(0x1da1f2)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown user")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(`${data.name} (@${data.handle})`, "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png", `https://twitter.com/${data.handle}`)
        .setDescription(data.bio)
        .addField(null, null, true)
        .addField("Link", `[twitter.com...](https://twitter.com/${data.handle})`, true)
        .addField(null, null, true)
        .setImage(data.banner);

    if (command.compactMode) embed.addField(null, `**Tweets:**: ${data.tweets.toLocaleString()}\n**Followers:** ${data.followers.toLocaleString()}\n**Following:** ${data.following.toLocaleString()}\n**Likes:** ${data.likes.toLocaleString()}\n**Tweets:** View ${data.name}'s tweets with the \`${prefix}view tweets\` command${data.location ? `\n**Location:** ${data.location}` : ""}${data.url ? `\n**URL:** ${data.url}` : ""}\n**Created:** ${parseDate(data.createdOn)}`);

    else {

        embed
            .addField("Followers", data.followers.toLocaleString(), true)
            .addField("Tweets", data.tweets.toLocaleString(), true)
            .addField("Following", data.following.toLocaleString(), true)
            .addField(null, null, true)
            .addField("Likes", data.likes.toLocaleString(), true)
            .addField(null, null, true);

        if (data.location) embed.addField("Location", data.location, true);
        if (data.url) embed.addField("URL", data.url, true);

        embed
            .addField("Created", parseDate(data.createdOn))
            .addField()
            .addField("Tweets", `View ${data.name}'s tweets with the \`${prefix}view tweets\` command`);
    }

    // Return
    return embed;
}