import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import { TwitterTweet } from "./parse";

export default function embed(command: Command, data?: TwitterTweet): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("Twitter Search", "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png")
        .setColor(0x1da1f2)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown tweet")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(`${data.user.name} (@${data.user.handle})`, "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png", `https://twitter.com/${data.user.handle}/status/${data.id}`)
        .setDescription(data.text)
        .addField(null, null, true)
        .addField("Link", `[twitter.com...](https://twitter.com/${data.user.handle}/status/${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed
        .addField(null, `**Likes:**: ${data.likes.toLocaleString()}\n**Retweets:** ${data.retweets.toLocaleString()}\n**User:** View info about the person who sent this tweet with the \`${prefix}view user\` command${data.quotedTweet ? `\n**Quoted Tweet:** View the quoted tweet with the \`${prefix}view quoted tweet\` command` : ""}\n**Sent:** ${parseDate(data.sentOn)}`)
        .setThumbnail(data.image);

    else {

        embed
            .addField("Likes", data.likes.toLocaleString(), true)
            .addField("Retweets", data.retweets.toLocaleString(), true)
            .addField("Sent", parseDate(data.sentOn))
            .addField()
            .addField("User", `View info about the person who sent this tweet with the \`${prefix}view user\` command`)
            .setImage(data.image);

        if (data.quotedTweet) embed.addField("Quoted Tweet", `View the quoted tweet with the \`${prefix}view quoted tweet\` command`);
    }

    // Return
    return embed;
}