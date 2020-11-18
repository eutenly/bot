import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { SearchResult } from "../types";

export default function embed(command: Command, data: SearchResult[]): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor(`Wikipedia Search: ${command.pageManager?.input}`, "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png")
        .setDescription(`Page ${command.pageManager?.page}`)
        .setColor(0xfefefe)
        .setBranding();

    // No data
    if (data.length === 0) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    data.forEach((d: SearchResult, i: number) => embed.addField(null, `**${i + 1}. [${d.title}](https://en.wikipedia.org/wiki/${encodeURIComponent(d.title)})**\n${d.text}\n**${d.words.toLocaleString()} Word${d.words === 1 ? "" : "s"}**`));

    if (command.compactMode) embed.addField(null, `*\u2022 React or use the \`${prefix}next\` and \`${prefix}previous\` commands to cycle through pages\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result*`);
    else embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}