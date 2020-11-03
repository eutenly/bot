import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";

export default function embed(command: Command, data: any): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor(data.title.title, "https://eutenly.com/assets/search-colored.png", data.link)
        .setColor(0x4086f4)
        .setBranding();

    // Label
    if (data.title.label) embed.setDescription(data.title.label);

    // Description
    if (data.description) embed.addField(null, data.description);

    // Data
    data.data.forEach((d: any) => {

        // Get value
        let value = d.value;

        // Stock price
        if ((typeof value === "object") && (value.type === "stockPrice")) value = `Name: ${value.name}\nPrice: ${value.price}\nPrice Change: ${value.priceChange}`;

        // Add field
        embed.addField(d.name, value, true);
    });

    // Products
    if (data.products) {

        // Get products
        const products = data.products.map((p: any, i: number) => `**p-${i + 1}.** ${p.name} - ${p.rating.rating} (${p.rating.totalRatings} Total Ratings)`);

        // Add field
        embed.addField("Products", `${products.join("\n")}\n\n*Use the \`${prefix}view <Product ID>\` command to search for a product*`);
    }

    // List
    if (data.list.length) data.list.forEach((l: any, i: number) => {

        // Get items
        const items = l.items.map((item: any, ii: number) => `[**${i + 1}-${ii + 1}.** ${item.name}]`);

        // Add field
        embed.addField(l.title, `${items.join(", ")}\n\n*Use the \`${prefix}view <Item Number>\` command to search for an item*`);
    });

    // Lyrics
    if (data.lyrics) embed.addField("\u200b", `**Lyrics**\nUse the \`${prefix}view lyrics\` command to see this song's lyrics`);

    // Available On
    if (data.availableOn) embed.addField("Available On", data.availableOn.map((p: any) => `[${p.name}](${p.link})`).join(" \u2022 "));

    // Profiles
    if (data.profiles) embed.addField("Profiles", data.profiles.map((p: any) => `[${p.name}](${p.link})`).join(" \u2022 "));

    // Related Searches
    if (data.relatedSearches) {

        // Get items
        const items = data.relatedSearches.map((s: any, i: number) => `**rs-${i + 1}.** ${s.name}`);

        // Add field
        embed.addField("Related Searches", `${items.join("\n")}\n\n*Use the \`${prefix}view <Related Search ID>\` command to search for a related search*`);
    }

    // Return
    return embed;
}