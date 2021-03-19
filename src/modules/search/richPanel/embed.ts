import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";

export default function embed(command: Command, data: any): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor(data.title, "https://eutenly.com/assets/search-colored.png", data.link)
        .setColor(0x4086f4)
        .setBranding();

    // Label
    if (data.label) embed.setDescription(data.label);

    // Description
    if (data.description) embed.addField(null, data.description);

    // Profiles
    if (data.profiles) embed.addField("Profiles", data.profiles.map((p: any) => `[${p.name}](${p.link})`).join(" \u2022 "));

    // Data
    if (data.data) data.data.forEach((d: any) => embed.addField(d.title, d.text, true));

    // Top songs
    if (data.topSongs) {

        // Get items
        const items = data.topSongs.items.map((s: any, i: number) => `**s-${i + 1}.** ${s.title} (${s.description})`);

        // Add field
        embed.addField(data.topSongs.title, `${items.join("\n")}\n\n*Use the \`/view\` command to search for a song*`);
    }

    // Events
    if (data.events) embed.addField(data.events.title, `${data.events.items.map((e: any) => `**${e.name}** (${e.location}) on ${e.date}`).join("\n")}`);

    // Grid List
    if (data.gridList) embed.addField(data.gridList.title, data.gridList.map((l: any) => `[${l.text}](${l.link})`).join(" \u2022 "));

    // Lists
    if (data.lists.length) data.lists.forEach((l: any, i: number) => {

        // Get items
        const items = l.items.map((item: any, ii: number) => `[**${i + 1}-${ii + 1}.** ${item.text}]`);

        // Add field
        embed.addField(l.title, `${items.join(", ")}\n\n*Use the \`/view\` command to search for an item*`);
    });

    // Return
    return embed;
}