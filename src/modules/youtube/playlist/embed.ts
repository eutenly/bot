import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import truncateString from "../../../util/truncateString";
import { YouTubePlaylist } from "./parse";

export default function embed(command: Command, data?: YouTubePlaylist): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("YouTube Search", "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/youtube-red-square.png")
        .setColor(0xff0000)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown playlist")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.name, "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/youtube-red-square.png", `https://youtube.com/playlist?list=${data.id}`)
        .setDescription(command.compactMode ? truncateString(data.description.replace(/\n/g, " "), 250) : truncateString(data.description, 500))
        .addField(null, null, true)
        .addField("Link", `[youtube.com...](https://youtube.com/playlist?list=${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed
        .addField(null, `**Total Videos:** ${data.videos.toLocaleString()}\n**Channel:** [${data.channel.name}](https://youtube.com/channel/${data.channel.id}) (\`${prefix}view channel\`)\n**Created:** ${parseDate(data.createdOn)}`)
        .setThumbnail(data.thumbnail);

    else embed
        .addField("Total Videos", data.videos.toLocaleString(), true)
        .addField("Channel", `[${data.channel.name}](https://youtube.com/channel/${data.channel.id})\n(\`${prefix}view channel\`)`, true)
        .addField("Created", parseDate(data.createdOn))
        .setImage(data.thumbnail);

    // Return
    return embed;
}