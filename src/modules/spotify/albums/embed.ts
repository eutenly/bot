import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { ListedAlbum } from "../types";

export default function embed(command: Command, data: ListedAlbum[]): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor(`${command.metadata?.artistName}: Albums`, "https://i.imgur.com/tiqno7l.png")
        .setDescription(`Page ${command.pageManager?.page}`)
        .setColor(0x1ed760)
        .setBranding();

    // No data
    command.noData = data.length === 0;
    if (data.length === 0) return embed
        .setDescription("There aren't that many albums")
        .setColor(0xf44242);

    // Build embed
    data.forEach((d: ListedAlbum, i: number) => embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/album/${d.id})**\n${d.tracks.toLocaleString()} Track${d.tracks === 1 ? "" : "s"}`));

    if (command.compactMode) embed.addField(null, "*\u2022 React or use the `/next` and `/previous` commands to cycle through pages\n\u2022 Use the `/view` command to get more info about a result*");
    else embed
        .addField()
        .addField("Navigation", "\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the `/next` and `/previous` commands\n\u2022 Use the `/view` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*")
        .addField();

    // Return
    return embed;
}