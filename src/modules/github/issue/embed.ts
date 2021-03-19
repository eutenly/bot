import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import truncateString from "../../../util/truncateString";
import { Issue } from "../types";

export default function embed(command: Command, data?: Issue): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Issue", "https://i.imgur.com/FwnDNtd.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    command.noData = !data;
    if (!data) return embed
        .setDescription("Unknown issue")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.title, "https://i.imgur.com/FwnDNtd.png", `https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/issues/${data.number}`)
        .setDescription(truncateString(data.text, 500))
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/issues/${data.number})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed.addField(null, `**User:** ${data.user} (\`/view result: user\`)\n**State:** ${data.state.charAt(0).toUpperCase()}${data.state.substring(1)}\n**Locked:** ${data.locked ? "Yes" : "No"}\n**Labels:** ${data.labels.join(", ") || "*None*"}\n**Repo:** \`/view result: repo\`\n**Issues:** \`/view result: issues\`\n**Created:** ${parseDate(data.createdOn)}`);

    else embed
        .addField("State", `${data.state.charAt(0).toUpperCase()}${data.state.substring(1)}`, true)
        .addField("User", `${data.user}\n(\`/view result: user\`)`, true)
        .addField("Locked", data.locked ? "Yes" : "No", true)
        .addField("Labels", data.labels.join(", ") || "*None*")
        .addField("Created", parseDate(data.createdOn))
        .addField()
        .addField("More", "**\u2022 Repo:** `/view result: repo`\n**\u2022 Issues:** `/view result: issues`");

    // Return
    return embed;
}