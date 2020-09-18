import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import { SpotifyPlaylist, SpotifyTrack } from "./parse";

export default function embed(command: Command, data?: SpotifyPlaylist): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor("Spotify Search", "https://i.imgur.com/tiqno7l.png")
        .setColor(0x1ed760)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.name, "https://i.imgur.com/tiqno7l.png", `https://open.spotify.com/playlist/${data.id}`)
        .setDescription(`${data.description.substring(0, 500)}${data.description.length > 500 ? "..." : ""}`)
        .addField(null, null, true)
        .addField("Link", `[spotify.com...](https://open.spotify.com/playlist/${data.id})`, true)
        .addField(null, null, true)
        .addField("Followers", `${data.followers.toLocaleString()} Follower${data.followers === 1 ? "" : "s"}`, true)
        .addField("Owner", data.ownerName, true)
        .addField("Tracks", `${data.tracks.map((t: SpotifyTrack, i: number) => `**t-${i + 1}. [${t.name}](https://open.spotify.com/track/${t.id})**\n[${t.artist.name}](https://open.spotify.com/artist/${t.artist.id}) - ${parseDuration(t.length)}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Track Number>\` to view a track\n\u2022 Use \`${prefix}view tracks\` to view more tracks`)
        .setImage(data.image);

    // Return
    return embed;
}