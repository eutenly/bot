import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import truncateString from "../../../util/truncateString";

export default function embed(command: Command, data?: any): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor("Wikipedia Search", "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png")
        .setColor(0xfefefe)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown article")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.title, "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png", `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`)
        .setDescription(command.compactMode ? truncateString(data.snippet, 500) : data.snippet)
        .addField(null, null, true)
        .addField("Link", `[wikipedia.org...](https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)})`, true)
        .addField(null, null, true);

    // Return
    return embed;
}