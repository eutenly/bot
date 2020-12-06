import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import truncateString from "../../../util/truncateString";
import { ListedRepo } from "../types";

export default function embed(command: Command, data: ListedRepo[]): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Repos", "https://i.imgur.com/FwnDNtd.png")
        .setDescription(`Page ${command.pageManager?.page}`)
        .setColor(0x000000)
        .setBranding();

    // No data
    command.noData = data.length === 0;
    if (data.length === 0) return embed
        .setDescription("There aren't that many repos")
        .setColor(0xf44242);

    // Get type
    let type: string | undefined;
    if (command.metadata?.type === "repos") type = "Repos";
    else if (command.metadata?.type === "subscriptions") type = "Watched Repos";
    else if (command.metadata?.type === "starred") type = "Starred Repos";

    // Build embed
    embed
        .setAuthor(`${command.pageManager?.input}'s ${type}`, "https://i.imgur.com/FwnDNtd.png", `https://github.com/${command.pageManager?.input}?tab=repositories`)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.pageManager?.input}?tab=repositories)`, true)
        .addField(null, null, true);

    data.forEach((d: ListedRepo, i: number) => embed.addField(null, `**${i + 1}. [${d.ownerName}/${d.name}](https://github.com/${d.ownerName}/${d.name})**\n${d.description ? `${truncateString(d.description, 200)}\n` : ""}**${d.stars.toLocaleString()} Star${d.stars === 1 ? "" : "s"} \u2022 ${d.forks.toLocaleString()} Fork${d.forks === 1 ? "" : "s"}**`));

    if (command.compactMode) embed.addField(null, `*\u2022 React or use the \`${prefix}next\` and \`${prefix}previous\` commands to cycle through pages\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result*`);
    else embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}