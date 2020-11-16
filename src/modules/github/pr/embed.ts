import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import truncateString from "../../../util/truncateString";
import { GitHubPR } from "./parse";

export default function embed(command: Command, data?: GitHubPR): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub PR", "https://i.imgur.com/FwnDNtd.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown PR")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.title, "https://i.imgur.com/FwnDNtd.png", `https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/pulls/${data.number}`)
        .setDescription(truncateString(data.text, 500))
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/pulls/${data.number})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed.addField(null, `**User:** ${data.user} (\`${prefix}view user\`)\n**State:** ${data.state.charAt(0).toUpperCase()}${data.state.substring(1)}\n**Locked:** ${data.locked ? "Yes" : "No"}\n**Labels:** ${data.labels.join(", ") || "*None*"}\n**Repo:** \`${prefix}view repo\`\n**Pull Requests:** \`${prefix}view prs\`\n**Created:** ${parseDate(data.createdOn)}`);

    else embed
        .addField("State", `${data.state.charAt(0).toUpperCase()}${data.state.substring(1)}`, true)
        .addField("User", `${data.user}\n(\`${prefix}view user\`)`, true)
        .addField("Locked", data.locked ? "Yes" : "No", true)
        .addField("Labels", data.labels.join(", ") || "*None*")
        .addField("Created", parseDate(data.createdOn))
        .addField()
        .addField("More", `**\u2022 Repo:** \`${prefix}view repo\`\n**\u2022 Pull Requests:** \`${prefix}view prs\``);

    // Return
    return embed;
}