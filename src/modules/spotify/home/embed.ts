import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import { SpotifyArtist, SpotifyHome, SpotifyPlaylist, SpotifyTrack } from "./parse";

export default function embed(command: Command, data?: SpotifyHome): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    if (!data) return new Embed();
    const embed = new Embed()
        .setAuthor("Spotify", "https://i.imgur.com/tiqno7l.png")
        .setColor(0x1ed760)
        .addField("Your Playlists", `${data.playlists.map((p: SpotifyPlaylist, i: number) => `**p-${i + 1}. [${p.name}](https://open.spotify.com/playlists/${p.id})** - ${p.tracks.toLocaleString()} Track${p.tracks === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Playlist Number>\` to view a playlist\n\u2022 Use \`${prefix}view playlists\` to view more of your playlists\n\u200b`)
        .addField("Your Top Tracks", `${data.topTracks.map((t: SpotifyTrack, i: number) => `**t-${i + 1}. [${t.name}](https://open.spotify.com/track/${t.id})** by [${t.artist.name}](https://open.spotify.com/artist/${t.artist.id}) - ${parseDuration(t.length)}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Track Number>\` to view a track\n\u2022 Use \`${prefix}spotify top tracks\` to view more of your top tracks\n\u200b`)
        .addField("Your Top Artists", `${data.topArtists.map((a: SpotifyArtist, i: number) => `**a-${i + 1}. [${a.name}](https://open.spotify.com/artist/${a.id})** - ${a.followers.toLocaleString()} Follower${a.followers === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Artist Number>\` to view an artist\n\u2022 Use \`${prefix}spotify top artists\` to view more of your top artists\n\u200b`)
        .addField("Recently Played", `${data.recentlyPlayed.map((t: SpotifyTrack, i: number) => `**r-${i + 1}. [${t.name}](https://open.spotify.com/track/${t.id})** by [${t.artist.name}](https://open.spotify.com/artist/${t.artist.id}) - ${parseDuration(t.length)}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Track Number>\` to view a track\n\u2022 Use \`${prefix}spotify history\` to view more of your recently played tracks`)
        .setBranding();

    // Return
    return embed;
}