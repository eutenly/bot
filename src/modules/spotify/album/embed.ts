import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import { Album, BasicTrack } from "../types";

export default function embed(command: Command, data?: Album): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("Spotify Album", "https://i.imgur.com/tiqno7l.png")
        .setColor(0x1ed760)
        .setBranding();

    // No data
    command.noData = !data;
    if (!data) return embed
        .setDescription("Unknown album")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.name, "https://i.imgur.com/tiqno7l.png", `https://open.spotify.com/album/${data.id}`)
        .addField(null, null, true)
        .addField("Link", `[spotify.com...](https://open.spotify.com/album/${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed
        .addField(null, `**Release Year:** ${(new Date(data.releasedOn)).getFullYear()}\n**Artist:** ${data.artist.name} (\`${prefix}view artist\`)`)
        .setThumbnail(data.albumArt);

    else embed
        .addField("Artist", `${data.artist.name}\n(\`${prefix}view artist\`)`, true)
        .addField("Release Year", (new Date(data.releasedOn)).getFullYear(), true)
        .setImage(data.albumArt);

    embed.addField("Tracks", `${data.tracks.map((t: BasicTrack, i: number) => `**t-${i + 1}.** [${t.name}](https://open.spotify.com/track/${t.id}) - ${parseDuration(t.length)}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Track Number>\` to view a track\n\u2022 Use \`${prefix}view tracks\` to view more tracks`);

    if (data.copyrights.length) embed.addField(null, data.copyrights.join("\n"));

    // Return
    return embed;
}