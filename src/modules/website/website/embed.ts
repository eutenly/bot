import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { WebsiteData } from "./parse";

export default function embed(command: Command, data?: WebsiteData): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor("Website", "https://i.imgur.com/fPhWAy9.png")
        .setColor(0xf40b3d)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown website")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.title || data.url, data.icon, data.url)
        .setDescription(data.description)
        .setColor(data.color || 0xf40b3d);

    if (data.websiteData) data.websiteData.fields.forEach((f) => embed.addField(f.title, f.description, f.inline));

    if (command.compactMode) embed.setThumbnail(data.image);
    else embed.setImage(data.image);

    // Return
    return embed;
}