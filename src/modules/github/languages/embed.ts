import filesize from "filesize";
import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { Languages } from "../types";

export default function embed(command: Command, data?: Languages): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Languages", "https://i.imgur.com/FwnDNtd.png")
        .setColor(0x000000)
        .setBranding();

    // No data
    command.noData = !data;
    if (!data) return embed
        .setDescription("Unknown repo")
        .setColor(0xf44242);

    // Get total size
    const totalSize: number = Object.keys(data).reduce((acc, current) => acc + data[current], 0);

    // Build embed
    embed
        .setAuthor(`${command.metadata?.ownerName}/${command.metadata?.name}: Languages`, "https://i.imgur.com/FwnDNtd.png", `https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}`)
        .setDescription(Object.keys(data).map((l: string) => {
            const percent = parseFloat(((data[l] / totalSize) * 100).toFixed(2));
            return `**${l}:** ${filesize(data[l])} (${percent ? percent : "<0.01"}%)`;
        }).join("\n"))
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name})`, true)
        .addField(null, null, true)
        .addField()
        .addField("Repo", "For info about this repo, use the `/view result: repo` command");

    // Return
    return embed;
}