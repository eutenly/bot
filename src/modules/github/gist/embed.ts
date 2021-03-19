import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import { Gist } from "../types";

export default function embed(command: Command, data?: Gist): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Gist", "https://i.imgur.com/FwnDNtd.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    command.noData = !data;
    if (!data) return embed
        .setDescription("Unknown Gist")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(`${command.metadata?.name}/${data.files[0]}`, "https://i.imgur.com/FwnDNtd.png", `https://gist.github.com/${command.metadata?.name}/${data.id}`)
        .setDescription(data.description)
        .addField(null, null, true)
        .addField("Link", `[gist.github.com...](https://gist.github.com/${command.metadata?.name}/${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed.addField(null, `**Files:** ${data.files.length.toLocaleString()}\n**Comments:** ${data.comments.toLocaleString()}\n**Forks:** ${data.forks.toLocaleString()}\n**User:** \`/view result: user\`\n**Gists:** \`/view result: gists\`\n**Created:** ${parseDate(data.createdOn)}`);

    else embed
        .addField("Comments", data.comments.toLocaleString(), true)
        .addField("Files", data.files.length.toLocaleString(), true)
        .addField("Forks", data.forks.toLocaleString(), true)
        .addField("Created", parseDate(data.createdOn))
        .addField()
        .addField("More", "**\u2022 User:** `/view result: user`\n**\u2022 Gists:** `/view result: gists`");

    // Return
    return embed;
}