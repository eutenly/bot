import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import truncateString from "../../../util/truncateString";
import { ListedTrack, Playlist } from "../types";

export default function embed(command: Command, data?: Playlist): Embed {

    // Embed
    const embed = new Embed()
        .setAuthor("Spotify Playlist", "https://i.imgur.com/tiqno7l.png")
        .setColor(0x1ed760)
        .setBranding();

    // No data
    command.noData = !data;
    if (!data) return embed
        .setDescription("Unknown playlist")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.name, "https://i.imgur.com/tiqno7l.png", `https://open.spotify.com/playlist/${data.id}`)
        .setDescription(command.compactMode ? truncateString(data.description, 250) : truncateString(data.description, 500))
        .addField(null, null, true)
        .addField("Link", `[spotify.com...](https://open.spotify.com/playlist/${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed
        .addField(null, `**Followers:** ${data.followers.toLocaleString()} Follower${data.followers === 1 ? "" : "s"}\n**Owner:** ${data.ownerName}`)
        .setThumbnail(data.image);

    else embed
        .addField("Followers", `${data.followers.toLocaleString()} Follower${data.followers === 1 ? "" : "s"}`, true)
        .addField("Owner", data.ownerName, true)
        .setImage(data.image);

    embed.addField("Tracks", `${data.tracks.map((t: ListedTrack, i: number) => `**t-${i + 1}. [${t.name}](https://open.spotify.com/track/${t.id})**\n[${t.artist.name}](https://open.spotify.com/artist/${t.artist.id}) - ${parseDuration(t.length)}`).join("\n")}\n\n\u2022 Use \`/view\` to view a track\n\u2022 Use \`/view result: tracks\` to view more tracks`);

    // Return
    return embed;
}