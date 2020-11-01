import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import { GitHubGist } from "./parse";

export default function embed(command: Command, data?: GitHubGist): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Search", "https://getdrawings.com/free-icon-bw/github-icon-23.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown gist")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(`${command.metadata?.name}/${data.files[0]}`, "https://getdrawings.com/free-icon-bw/github-icon-23.png", `https://gist.github.com/${command.metadata?.name}/${data.id}`)
        .setDescription(data.description)
        .addField(null, null, true)
        .addField("Link", `[gist.github.com...](https://gist.github.com/${command.metadata?.name}/${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed.addField(null, `**Files:** ${data.files.length.toLocaleString()}\n**Comments:** ${data.comments.toLocaleString()}\n**Forks:** ${data.forks.toLocaleString()}\n**User:** \`${prefix}view user\`\n**Gists:** \`${prefix}view gists\`\n**Created:** ${parseDate(data.createdOn)}`);

    else embed
        .addField("Comments", data.comments.toLocaleString(), true)
        .addField("Files", data.files.length.toLocaleString(), true)
        .addField("Forks", data.forks.toLocaleString(), true)
        .addField("Created", parseDate(data.createdOn))
        .addField()
        .addField("More", `**\u2022 User:** \`${prefix}view user\`\n**\u2022 Gists:** \`${prefix}view gists\``);

    // Return
    return embed;
}