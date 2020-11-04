import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import truncateString from "../../../util/truncateString";
import { YouTubeChannel } from "./parse";

export default function embed(command: Command, data?: YouTubeChannel): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("YouTube Search", "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/youtube-red-square.png")
        .setColor(0xff0000)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown channel")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.name, "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/youtube-red-square.png", `https://youtube.com/channel/${data.id}`)
        .setDescription(command.compactMode ? truncateString(data.description.replace(/\n/g, " "), 250) : truncateString(data.description, 500))
        .addField(null, null, true)
        .addField("Link", `[youtube.com...](https://youtube.com/channel/${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed
        .addField(null, `**Subscribers:** ${data.subscribersHidden ? "Hidden" : data.subscribers.toLocaleString()}\n**Total Views:** ${data.views.toLocaleString()}\n**Total Videos:** ${data.videos.toLocaleString()}\n\n**Videos:** Use the \`${prefix}view videos\` command to view this channel's videos\n**Created:** ${parseDate(data.createdOn)}`)
        .setThumbnail(data.avatar);

    else embed.addField("Subscribers", data.subscribersHidden ? "Hidden" : data.subscribers.toLocaleString(), true)
        .addField("Total Views", data.views.toLocaleString(), true)
        .addField("Total Videos", data.videos.toLocaleString(), true)
        .addField("Videos", `Use the \`${prefix}view videos\` command to view this channel's videos`)
        .addField("Created", parseDate(data.createdOn))
        .setImage(data.avatar);

    // Return
    return embed;
}