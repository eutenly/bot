import Command from "../../classes/Command/Command";
import Embed from "../../classes/Embed/Embed";
import { SavedLink } from "../../models/users";
import formatURL from "../../util/formatURL";

export default function embed(command: Command, data: SavedLink[]): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("Saved Links", "https://eutenly.com/assets/link-colored.png")
        .setDescription(`Page ${command.searchManager?.page}`)
        .setColor(0xf40b3d)
        .setBranding();

    // No data
    if (data.length === 0) return embed
        .setDescription("You don't have that many saved links")
        .setColor(0xf44242);

    // Build embed
    data.forEach((l: SavedLink, i: number) => embed.addField(null, `**${i + 1}. ${l.title ? `[${l.title}](${l.url})` : formatURL(l.url)}**${l.description ? `\n${l.description}` : ""}`));

    embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}