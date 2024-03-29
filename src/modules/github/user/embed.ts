import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import formatURL from "../../../util/formatURL";
import parseDate from "../../../util/parseDate";
import { User } from "../types";

export default function embed(command: Command, data?: User): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub User", "https://i.imgur.com/FwnDNtd.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    command.noData = !data;
    if (!data) return embed
        .setDescription("Unknown user")
        .setColor(0xf44242);

    // Build embed
    if (data.bio) embed.setDescription(data.bio);

    embed
        .setAuthor(`GitHub: ${data.name}`, "https://i.imgur.com/FwnDNtd.png", `https://github.com/${data.name}`)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${data.name})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed.addField(null, `**Followers:** ${data.followers.toLocaleString()}\n**Public Repos:** ${data.repos.toLocaleString()} Repos (\`/view result: repos\`)\n**Public Gists:** ${data.gists.toLocaleString()} Gists (\`/view result: gists\`)\n**Location:** ${data.location || "*None*"}\n**Website:** ${data.website ? formatURL(data.website) : "*None*"}\n**Company:** ${data.company || "*None*"}\n**Events:** View ${data.name}'s events with the \`/view result: events\` command\n**Created:** ${parseDate(data.createdOn)}`);

    else embed
        .addField("Public Repos", `${data.repos.toLocaleString()} Repos\n(\`/view result: repos\`)`, true)
        .addField("Followers", data.followers.toLocaleString(), true)
        .addField("Public Gists", `${data.gists.toLocaleString()} Gists\n(\`/view result: gists\`)`, true)
        .addField("Location", data.location || "*None*", true)
        .addField("Website", data.website ? formatURL(data.website) : "*None*", true)
        .addField("Company", data.company || "*None*", true)
        .addField("Created", parseDate(data.createdOn))
        .addField()
        .addField("Events", `View ${data.name}'s events with the \`/view result: events\` command`);

    // Return
    return embed;
}