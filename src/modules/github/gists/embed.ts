import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { ListedGist } from "../types";

export default function embed(command: Command, data: ListedGist[]): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Gists", "https://i.imgur.com/FwnDNtd.png")
        .setDescription(`Page ${command.pageManager?.page}`)
        .setColor(0x000000)
        .setBranding();

    // No data
    command.noData = data.length === 0;
    if (data.length === 0) return embed
        .setDescription("There aren't that many Gists")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(`${command.metadata?.name}: Gists`, "https://i.imgur.com/FwnDNtd.png", `https://gist.github.com/${command.metadata?.name}`)
        .addField(null, null, true)
        .addField("Link", `[gist.github.com...](https://gist.github.com/${command.metadata?.name})`, true)
        .addField(null, null, true);

    data.forEach((d: ListedGist, i: number) => embed.addField(null, `**${i + 1}. [${command.metadata?.name}/${d.name}](https://gist.github.com/${command.metadata?.name}/${d.id})**${d.description ? `\n${d.description}` : ""}`));

    if (command.compactMode) embed.addField(null, "*\u2022 React or use the `/next` and `/previous` commands to cycle through pages\n\u2022 Use the `/view` command to get more info about a result*");
    else embed
        .addField()
        .addField("Navigation", "\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the `/next` and `/previous` commands\n\u2022 Use the `/view` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*")
        .addField();

    // Return
    return embed;
}