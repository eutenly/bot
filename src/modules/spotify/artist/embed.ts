import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import { Artist, BasicTrack, ListedAlbum } from "../types";

export default function embed(command: Command, data?: Artist): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor("Spotify Artist", "https://i.imgur.com/tiqno7l.png")
        .setColor(0x1ed760)
        .setBranding();

    // No data
    command.noData = !data;
    if (!data) return embed
        .setDescription("Unknown artist")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.name, "https://i.imgur.com/tiqno7l.png", `https://open.spotify.com/artist/${data.id}`)
        .addField(null, null, true)
        .addField("Link", `[spotify.com...](https://open.spotify.com/artist/${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed
        .addField(null, `**Followers:** ${data.followers.toLocaleString()}\n**Genres:** ${data.genres.join(", ") || "*None*"}`)
        .setThumbnail(data.avatar);

    else embed
        .addField(null, null, true)
        .addField("Followers", `${data.followers.toLocaleString()} Follower${data.followers === 1 ? "" : "s"}`, true)
        .addField(null, null, true)
        .setImage(data.avatar);

    embed
        .addField("Top Tracks", `${data.topTracks.map((t: BasicTrack, i: number) => `**t-${i + 1}.** [${t.name}](https://open.spotify.com/track/${t.id}) - ${parseDuration(t.length)}`).join("\n")}\n\n\u2022 Use \`/view\` to view a track\n\u2022 Use \`/view result: top tracks\` to view all tracks`)
        .addField("Albums", `${data.albums.map((a: ListedAlbum, i: number) => `**a-${i + 1}.** [${a.name}](https://open.spotify.com/album/${a.id}) - ${a.tracks.toLocaleString()} Track${a.tracks === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`/view\` to view an album\n\u2022 Use \`/view result: albums\` to view more albums`);

    if (!command.compactMode) embed.addField("Genres", data.genres.join(", ") || "*None*");

    // Return
    return embed;
}