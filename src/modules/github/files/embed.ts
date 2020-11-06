import filesize from "filesize";
import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { GitHubSearchResult } from "./parse";

export default function embed(command: Command, data: GitHubSearchResult[]): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Get path
    const path: string = command.metadata?.path;

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
        .setAuthor(`${command.metadata?.ownerName}/${command.metadata?.name}: Files`, "https://getdrawings.com/free-icon-bw/github-icon-23.png", `https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/tree/master/${path}`)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/tree/master/${path})`, true)
        .addField(null, null, true);

    // Define items
    const items: string[] = [];
    if (path) items.push(`**1. [../](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/tree/master/${path.split("/").slice(0, path.split("/").length - 1).join("/")})**`);
    items.push(...data.map((d, i) => `**${i + (path ? 2 : 1)}. [${d.name}${d.type === "dir" ? "/" : ""}](https://github.com/${command.metadata?.ownerName}/${command.metadata?.name}/${d.type === "dir" ? "tree" : "blob"}/master/${d.path})**${d.type !== "dir" ? ` (${filesize(d.size)})` : ""}`));

    // Add split field
    embed.addSplitField(null, items);

    if (command.compactMode) embed.addField(null, `*\u2022 React or use the \`${prefix}next\` and \`${prefix}previous\` commands to cycle through pages\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result*`);
    else embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}