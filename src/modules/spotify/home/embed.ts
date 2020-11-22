import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import { Home, ListedArtist, ListedPlaylist, ListedTrack } from "../types";

export default function embed(command: Command, data?: Home): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    if (!data) return new Embed();

    const playlists: ListedPlaylist[] = command.compactMode ? data.playlists.slice(0, 3) : data.playlists;
    const topTracks: ListedTrack[] = command.compactMode ? data.topTracks.slice(0, 3) : data.topTracks;
    const topArtists: ListedArtist[] = command.compactMode ? data.topArtists.slice(0, 3) : data.topArtists;
    const recentlyPlayed: ListedTrack[] = command.compactMode ? data.recentlyPlayed.slice(0, 3) : data.recentlyPlayed;

    const embed = new Embed()
        .setAuthor("Spotify", "https://i.imgur.com/tiqno7l.png")
        .setColor(0x1ed760)
        .addField("Your Playlists", playlists.length ? `${playlists.map((p: ListedPlaylist, i: number) => `**p-${i + 1}. [${p.name}](https://open.spotify.com/playlists/${p.id})** - ${p.tracks.toLocaleString()} Track${p.tracks === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Playlist Number>\` to view a playlist\n\u2022 Use \`${prefix}view playlists\` to view more of your playlists\n\u200b` : "You don't have any playlists")
        .addField("Your Top Tracks", topTracks.length ? `${topTracks.map((t: ListedTrack, i: number) => `**t-${i + 1}. [${t.name}](https://open.spotify.com/track/${t.id})** by [${t.artist.name}](https://open.spotify.com/artist/${t.artist.id}) - ${parseDuration(t.length)}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Track Number>\` to view a track\n\u2022 Use \`${prefix}spotify top tracks\` to view more of your top tracks\n\u200b` : "You don't have any top tracks")
        .addField("Your Top Artists", topArtists.length ? `${topArtists.map((a: ListedArtist, i: number) => `**a-${i + 1}. [${a.name}](https://open.spotify.com/artist/${a.id})** - ${a.followers.toLocaleString()} Follower${a.followers === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Artist Number>\` to view an artist\n\u2022 Use \`${prefix}spotify top artists\` to view more of your top artists\n\u200b` : "You don't have any top artists")
        .addField("Recently Played", recentlyPlayed.length ? `${recentlyPlayed.map((t: ListedTrack, i: number) => `**r-${i + 1}. [${t.name}](https://open.spotify.com/track/${t.id})** by [${t.artist.name}](https://open.spotify.com/artist/${t.artist.id}) - ${parseDuration(t.length)}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Track Number>\` to view a track\n\u2022 Use \`${prefix}spotify history\` to view more of your recently played tracks` : "You haven't played anything yet")
        .setBranding();

    // Return
    return embed;
}