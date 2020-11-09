import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDate from "../../../util/parseDate";
import parseISO8601 from "../../../util/parseISO8601";
import truncateString from "../../../util/truncateString";
import { YouTubeVideo } from "./parse";

export default function embed(command: Command, data?: YouTubeVideo): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("YouTube Search", "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/youtube-red-square.png")
        .setColor(0xff0000)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Unknown video")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.title, "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/youtube-red-square.png", `https://youtube.com/watch?v=${data.id}`)
        .setDescription(truncateString(data.description, 500))
        .addField(null, null, true)
        .addField("Link", `[youtube.com...](https://youtube.com/watch?v=${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed
        .addField(null, `**Views:** ${data.views.toLocaleString()}\n**Likes:** ${data.likes.toLocaleString()}\n**Dislikes:** ${data.dislikes.toLocaleString()}\n**Comments:** ${data.comments.toLocaleString()}\n**Length:** ${parseISO8601(data.length)}\n**Uploaded By:** [${data.channel.name}](https://youtube.com/channel/${data.channel.id}) (\`${prefix}view channel\`)\n**Uploaded:** ${parseDate(data.uploadedOn)}\n\n**Embed:** Use the \`${prefix}view embed\` command to have this video embedded in chat`)
        .setThumbnail(data.thumbnail);

    else embed
        .addField("Views", data.views.toLocaleString(), true)
        .addField("Uploaded By", `[${data.channel.name}](https://youtube.com/channel/${data.channel.id})\n(\`${prefix}view channel\`)`, true)
        .addField("Length", parseISO8601(data.length), true)
        .addField("Likes", data.likes.toLocaleString(), true)
        .addField("Comments", data.comments.toLocaleString(), true)
        .addField("Dislikes", data.dislikes.toLocaleString(), true)
        .addField("Uploaded", parseDate(data.uploadedOn))
        .addField("Embed", `Use the \`${prefix}view embed\` command to have this video embedded in chat`)
        .setImage(data.thumbnail);

    // Return
    return embed;
}