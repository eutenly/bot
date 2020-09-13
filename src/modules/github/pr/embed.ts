import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import englishDate from "../../../util/englishDate";
import { GitHubPR } from "./parse";

export default function embed(command: Command, data?: GitHubPR): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Search", "https://getdrawings.com/free-icon-bw/github-icon-23.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown pull request")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.title, "https://getdrawings.com/free-icon-bw/github-icon-23.png", `https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/pulls/${data.number}`)
        .setDescription(`${data.text.substring(0, 500)}${data.text.length > 500 ? "..." : ""}`)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/pulls/${data.number})`, true)
        .addField(null, null, true)
        .addField("State", `${data.state.charAt(0).toUpperCase()}${data.state.substring(1)}`, true)
        .addField("User", `${data.user}\n(\`${prefix}view user\`)`, true)
        .addField("Locked", data.locked ? "Yes" : "No", true)
        .addField("Labels", data.labels.join(", ") || "*None*")
        .addField("Created On", englishDate(data.createdOn))
        .addField()
        .addField("More", `**\u2022 Repo:** \`${prefix}view repo\`\n**\u2022 Pull Requests:** \`${prefix}view prs\``);

    // Return
    return embed;
}