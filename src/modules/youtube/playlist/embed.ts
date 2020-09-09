import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import englishDate from "../../../util/englishDate";
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
        .setDescription(`${data.description.substring(0, 500)}${data.description.length > 500 ? "..." : ""}`)
        .addField(null, null, true)
        .addField("Link", `[youtube.com...](https://youtube.com/playlist?list=${data.id})`, true)
        .addField(null, null, true)
        .addField("Total Videos", data.videos.toLocaleString(), true)
        .addField("Channel", `[${data.channel.name}](https://youtube.com/channel/${data.channel.id})\n(\`${prefix}view channel\`)`, true)
        .addField("Created On", englishDate(data.createdOn))
        .setImage(data.thumbnail);

    // Return
    return embed;
}