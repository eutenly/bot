import filesize from "filesize";
import { isBinary } from "istextorbinary";
import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import truncateString from "../../../util/truncateString";
import { GitHubFile } from "./parse";

export default function embed(command: Command, data?: GitHubFile): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub File", "https://i.imgur.com/FwnDNtd.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown file")
        .setColor(0xf44242);

    // Get content
    const contentBuffer: Buffer = Buffer.from(data.content, "base64");
    const content: string = isBinary(null, contentBuffer) ? "Binary" : contentBuffer.toString("ascii");

    // Build embed
    embed
        .setAuthor(`${command.metadata?.ownerName}/${command.metadata?.name}: ${data.name}`, "https://i.imgur.com/FwnDNtd.png", `https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/blob/master/${data.path}`)
        .setDescription(`\`\`\`\n${truncateString(content, 500)}\`\`\``)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/blob/master/${data.path})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed.addField(null, `**Size:** ${filesize(data.size)}\n**Repo:** To view this file's repo, use the \`${prefix}view repo\` command`);

    else embed
        .addField(null, null, true)
        .addField("Size", filesize(data.size), true)
        .addField(null, null, true)
        .addField()
        .addField("Repo", `To view this file's repo, use the \`${prefix}view repo\` command`);

    // Return
    return embed;
}