import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { GitHubSearchResult } from "./parse";

export default function embed(command: Command, data: GitHubSearchResult[]): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Search", "https://getdrawings.com/free-icon-bw/github-icon-23.png")
        .setDescription(`Page ${command.searchManager?.page}`)
        .setColor(0x000000)
        .setBranding();

    // No data
    if (data.length === 0) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(`${command.metadata?.ownerName}/${command.metadata?.name}: Issues`, "https://getdrawings.com/free-icon-bw/github-icon-23.png", `https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/issues`)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/issues)`, true)
        .addField(null, null, true);

    data.forEach((d: GitHubSearchResult, i: number) => embed.addField(null, `**${i + 1}. [${d.title}](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/issues/${d.number})**\n${d.text.replace(/[\n\r]/g, " ").substring(0, 80)}${d.text.replace(/[\n\r]/g, " ").length > 80 ? "..." : ""}`));

    embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}