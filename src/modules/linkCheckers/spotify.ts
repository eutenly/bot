import Message from "../../classes/Message/Message";
import spotifyAlbum from "../spotify/album/main";
import spotifyArtist from "../spotify/artist/main";
import spotifyCurrent from "../spotify/current";
import spotifyEpisode from "../spotify/episode/main";
import spotifyHistory from "../spotify/history";
import spotifyPlaylist from "../spotify/playlist/main";
import spotifyTop from "../spotify/top/main";
import spotifyTrack from "../spotify/track/main";

export default function spotify(input: string, linksOnly?: boolean): Function | undefined {

    // Check if input is a track link
    const track = input.match(/open\.spotify\.com\/track\/(.+)/);
    if (track) return (message: Message) => spotifyTrack(message, track[1]);

    // Check if input is an artist link
    const artist = input.match(/open\.spotify\.com\/artist\/(.+)/);
    if (artist) return (message: Message) => spotifyArtist(message, artist[1]);

    // Check if input is an album link
    const album = input.match(/open\.spotify\.com\/album\/(.+)/);
    if (album) return (message: Message) => spotifyAlbum(message, album[1]);

    // Check if input is a playlist link
    const playlist = input.match(/open\.spotify\.com\/playlist\/(.+)/);
    if (playlist) return (message: Message) => spotifyPlaylist(message, playlist[1]);

    // Check if input is an episode link
    const episode = input.match(/open\.spotify\.com\/episode\/(.+)/);
    if (episode) return (message: Message) => spotifyEpisode(message, episode[1]);

    if (!linksOnly) {

        // Check if input is current track
        if (input.toLowerCase().replace(/\s+/g, "") === "current") return (message: Message) => spotifyCurrent(message);

        // Check if input is top tracks or top artists
        if ((input.toLowerCase().replace(/\s+/g, "") === "top") || (input.toLowerCase().replace(/\s+/g, "") === "toptracks")) return (message: Message) => spotifyTop(message, "tracks");
        if (input.toLowerCase().replace(/\s+/g, "") === "topartists") return (message: Message) => spotifyTop(message, "artists");

        // Check if input is history
        if (input.toLowerCase().replace(/\s+/g, "") === "history") return (message: Message) => spotifyHistory(message);
    }
}