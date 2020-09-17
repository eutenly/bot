import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import formatURL from "../../../util/formatURL";
import { GitHubUser } from "./parse";

export default function embed(command: Command, data?: GitHubUser): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Search", "https://getdrawings.com/free-icon-bw/github-icon-23.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown user")
        .setColor(0xf44242);

    // Build embed
    if (data.bio) embed.setDescription(data.bio);

    embed
        .setAuthor(`GitHub: ${data.name}`, "https://getdrawings.com/free-icon-bw/github-icon-23.png", `https://github.com/${data.name}`)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${data.name})`, true)
        .addField(null, null, true)
        .addField("Public Repos", `${data.repos.toLocaleString()} Repos\n(\`${prefix}view repos\`)`, true)
        .addField("Followers", data.followers.toLocaleString(), true)
        .addField("Public Gists", `${data.gists.toLocaleString()} Gists\n(\`${prefix}view gists\`)`, true)
        .addField("Location", data.location || "*None*", true)
        .addField("Website", data.website ? formatURL(data.website) : "*None*", true)
        .addField("Company", data.company || "*None*", true)
        .addField("Created", parseDate(data.createdOn))
        .addField()
        .addField("Events", `View ${data.name}'s events with the \`${prefix}view events\` command`);

    // Return
    return embed;
}