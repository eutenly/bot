import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import truncateString from "../../../util/truncateString";
import { Release } from "../types";

export default function embed(command: Command, data?: Release): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Release", "https://i.imgur.com/FwnDNtd.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    command.noData = !data;
    if (!data) return embed
        .setDescription("Unknown release")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.name || data.tag, "https://i.imgur.com/FwnDNtd.png", `https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/releases/tag/${data.tag}`)
        .setDescription(truncateString(data.text, 500))
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/releases/tag/${data.tag})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed.addField(null, `**User:** ${data.user} (\`${prefix}view user\`)\n**Zipball:** [github.com...](${data.zipball})\n**Tarball:** [github.com...](${data.tarball})\n**Repo:** \`${prefix}view repo\`\n**Releases:** \`${prefix}view releases\`\n**Created:** ${parseDate(data.createdOn)}`);

    else embed
        .addField("Zipball", `[github.com...](${data.zipball})`, true)
        .addField("User", `${data.user}\n(\`${prefix}view user\`)`, true)
        .addField("Tarball", `[github.com...](${data.tarball})`, true)
        .addField("Created", parseDate(data.createdOn))
        .addField()
        .addField("More", `**\u2022 Repo:** \`${prefix}view repo\`\n**\u2022 Releases:** \`${prefix}view releases\``);

    // Return
    return embed;
}