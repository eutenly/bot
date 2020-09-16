import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { SpotifyAlbum } from "./parse";

export default function embed(command: Command, data: SpotifyAlbum[]): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor(`${command.metadata?.artistName}: Albums`, "https://i.imgur.com/tiqno7l.png")
        .setDescription(`Page ${command.searchManager?.page}`)
        .setColor(0x1ed760)
        .setBranding();

    // No data
    if (data.length === 0) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    data.forEach((d: SpotifyAlbum, i: number) => embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/album/${d.id})**\n${d.tracks.toLocaleString()} Track${d.tracks === 1 ? "" : "s"}`));

    embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}