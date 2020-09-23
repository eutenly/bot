import Command from "../../../../classes/Command/Command";
import Embed from "../../../../classes/Embed/Embed";

export default function embed(command: Command, data: any): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor(`Lyrics: ${data.title.title}`, "https://eutenly.com/assets/search-colored.png", data.link)
        .setColor(0x4086f4)
        .setBranding();

    // Lyrics
    data.lyrics.forEach((l: any) => embed.addField(null, l.join("\n")));

    // Return
    return embed;
}