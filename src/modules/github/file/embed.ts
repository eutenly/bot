import filesize from "filesize";
import { isBinary } from "istextorbinary";
import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { GitHubFile } from "./parse";

export default function embed(command: Command, data?: GitHubFile): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Search", "https://getdrawings.com/free-icon-bw/github-icon-23.png")
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
        .setAuthor(`${command.metadata?.ownerName}/${command.metadata?.name}: ${data.name}`, "https://getdrawings.com/free-icon-bw/github-icon-23.png", `https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/blob/master/${data.path}`)
        .setDescription(`\`\`\`\n${content.substring(0, 500)}${content.length > 500 ? "..." : ""}\`\`\``)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/blob/master/${data.path})`, true)
        .addField(null, null, true)
        .addField(null, null, true)
        .addField("Size", filesize(data.size), true)
        .addField(null, null, true)
        .addField()
        .addField("Repo", `To view this file's repo, use the \`${prefix}view repo\` command`);

    // Return
    return embed;
}