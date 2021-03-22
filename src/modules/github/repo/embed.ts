import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import formatURL from "../../../util/formatURL";
import parseDate from "../../../util/parseDate";
import { Repo } from "../types";

export default function embed(command: Command, data?: Repo): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Repo", "https://i.imgur.com/FwnDNtd.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    command.noData = !data;
    if (!data) return embed
        .setDescription("Unknown repo")
        .setColor(0xf44242);

    // Build embed
    if (data.description) embed.setDescription(data.description);

    embed
        .setAuthor(`${data.ownerName}/${data.name}`, "https://i.imgur.com/FwnDNtd.png", `https://github.com/${data.ownerName}/${data.name}`)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${data.ownerName}/${data.name})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed.addField(null, `**Stars:** ${data.stars.toLocaleString()}\n**Watchers:** ${data.watchers.toLocaleString()}\n**Forks:** ${data.forks.toLocaleString()}\n**Language:** ${data.language ? `${data.language} (\`/view result: languages\`)` : "*None*"}\n**License:** ${data.license || "*None*"}\n**Website:** ${data.website ? formatURL(data.website) : "*None*"}\n**User:** \`/view result: user\`\n**Files:** \`/view result: files\`\n**Issues:** \`/view result: issues\`\n**Pull Requests:** \`/view result: prs\`\n**Releases:** \`/view result: releases\`\n**Events:** \`/view result: events\`\n**Created:** ${parseDate(data.createdOn)}`);

    else embed
        .addField("Stars", data.stars.toLocaleString(), true)
        .addField("Watchers", data.watchers.toLocaleString(), true)
        .addField("Forks", data.forks.toLocaleString(), true)
        .addField("License", data.license || "*None*", true)
        .addField("Language", data.language ? `${data.language}\n(\`/view result: languages\`)` : "*None*", true)
        .addField("Website", data.website ? formatURL(data.website) : "*None*", true)
        .addField("Created", parseDate(data.createdOn))
        .addField()
        .addField("More", `**\u2022 User:** \`/view result: user\`\n**\u2022 Files:** \`/view result: files\`${data.hasIssues ? `\n**\u2022 Issues:** \`/view result: issues\`` : ""}\n**\u2022 Pull Requests:** \`/view result: prs\`\n**\u2022 Releases:** \`/view result: releases\`\n**\u2022 Events:** \`/view result: events\``);

    // Return
    return embed;
}