import filesize from "filesize";
import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import englishDate from "../../../util/englishDate";
import { GitHubLanguages } from "./parse";

export default function embed(command: Command, data?: GitHubLanguages): Embed {

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

    // Get total size
    const totalSize: number = Object.keys(data).reduce((acc, current) => acc + data[current], 0);

    // Build embed
    embed
        .setAuthor(`${command.metadata?.ownerName}/${command.metadata?.name}: Languages`, "https://getdrawings.com/free-icon-bw/github-icon-23.png", `https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}`)
        .setDescription(Object.keys(data).map((l: string) => {
            const percent = parseFloat(((data[l] / totalSize) * 100).toFixed(2));
            return `**${l}:** ${filesize(data[l])} (${percent ? percent : "<0.01"}%)`;
        }).join("\n"))
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name})`, true)
        .addField(null, null, true)
        .addField()
        .addField("Repo", `For info about this repo, use the \`${prefix}view repo\` command`);

    // Return
    return embed;
}