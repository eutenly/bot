import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import formatURL from "../../../util/formatURL";
import { GitHubRepo } from "./parse";

export default function embed(command: Command, data?: GitHubRepo): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Search", "https://getdrawings.com/free-icon-bw/github-icon-23.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown repo")
        .setColor(0xf44242);

    // Build embed
    if (data.description) embed.setDescription(data.description);

    embed
        .setAuthor(`${data.ownerName}/${data.name}`, "https://getdrawings.com/free-icon-bw/github-icon-23.png", `https://github.com/${data.ownerName}/${data.name}`)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${data.ownerName}/${data.name})`, true)
        .addField(null, null, true)
        .addField("Stars", data.stars.toLocaleString(), true)
        .addField("Watchers", data.watchers.toLocaleString(), true)
        .addField("Forks", data.forks.toLocaleString(), true)
        .addField("License", data.license || "*None*", true)
        .addField("Language", data.language ? `${data.language}\n(\`${prefix}view languages\`)` : "*None*", true)
        .addField("Website", data.website ? formatURL(data.website) : "*None*", true)
        .addField("Created", parseDate(data.createdOn))
        .addField()
        .addField("More", `**\u2022 User:** \`${prefix}view user\`\n**\u2022 Files:** \`${prefix}view files\`${data.hasIssues ? `\n**\u2022 Issues:** \`${prefix}view issues\`` : ""}\n**\u2022 Pull Requests:** \`${prefix}view prs\`\n**\u2022 Releases:** \`${prefix}view releases\`\n**\u2022 Events:** \`${prefix}view events\``);

    // Return
    return embed;
}