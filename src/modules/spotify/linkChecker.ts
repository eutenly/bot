import Message from "../../classes/Message/Message";
import { LinkCheckerModule } from "../website/website/main";
import spotifyAlbum from "./album/main";
import spotifyArtist from "./artist/main";
import spotifyCurrent from "./current";
import spotifyEpisode from "./episode/main";
import spotifyHistory from "./history/main";
import spotifyHome from "./home/main";
import spotifyPlaylist from "./playlist/main";
import searchLastMessage from "./searchLastMessage";
import spotifySearchOverview from "./searchOverview/main";
import spotifyTop from "./top/main";
import spotifyTrack from "./track/main";
import spotifyUpdatePlayer from "./updatePlayer";

export default function linkChecker(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Create url
    let inputURL: string = input;
    if ((!inputURL.startsWith("http://")) && (!inputURL.startsWith("https://"))) inputURL = `http://${inputURL}`;
    let url: URL = new URL("https://this_variable_needs_to_be_defined");
    try { url = new URL(inputURL); } catch { }

    // Regexes
    const HOSTNAME_REGEX: RegExp = /^(www\.)?open\.spotify\.com$/;

    if (HOSTNAME_REGEX.test(url.hostname)) {

        // Check if input is a track link
        const track = url.pathname.match(/\/track\/(.+)/);
        if (track) return (message: Message) => spotifyTrack(message, track[1]);

        // Check if input is an artist link
        const artist = url.pathname.match(/\/artist\/(.+)/);
        if (artist) return (message: Message) => spotifyArtist(message, artist[1]);

        // Check if input is an album link
        const album = url.pathname.match(/\/album\/(.+)/);
        if (album) return (message: Message) => spotifyAlbum(message, album[1]);

        // Check if input is a playlist link
        const playlist = url.pathname.match(/\/playlists\/(.+)/);
        if (playlist) return (message: Message) => spotifyPlaylist(message, playlist[1]);

        // Check if input is an episode link
        const episode = url.pathname.match(/\/episode\/(.+)/);
        if (episode) return (message: Message) => spotifyEpisode(message, episode[1]);

        // Check if input is a search link
        const search = url.pathname.match(/\/search\/(.+)/);
        if (search) return (message: Message) => spotifySearchOverview(message, search[1]);

        // Check if input is home
        if (url.pathname === "/") return (message: Message) => spotifyHome(message);
    }

    if (!linksOnly) {

        // Check if input is resume
        if (["resume", "play"].includes(input.toLowerCase().replace(/\s+/g, ""))) return (message: Message) => spotifyUpdatePlayer(message, "play") as any;

        // Check if input is pause
        if (input.toLowerCase().replace(/\s+/g, "") === "pause") return (message: Message) => spotifyUpdatePlayer(message, "pause") as any;

        // Check if input is skip
        if (["skip", "next"].includes(input.toLowerCase().replace(/\s+/g, ""))) return (message: Message) => spotifyUpdatePlayer(message, "next") as any;

        // Check if input is previous
        if (["previous", "back"].includes(input.toLowerCase().replace(/\s+/g, ""))) return (message: Message) => spotifyUpdatePlayer(message, "previous") as any;

        // Check if input is current track
        if (input.toLowerCase().replace(/\s+/g, "") === "current") return (message: Message) => spotifyCurrent(message) as any;

        // Check if input is top tracks or top artists
        if ((input.toLowerCase().replace(/\s+/g, "") === "top") || (input.toLowerCase().replace(/\s+/g, "") === "toptracks")) return (message: Message) => spotifyTop(message, "tracks");
        if (input.toLowerCase().replace(/\s+/g, "") === "topartists") return (message: Message) => spotifyTop(message, "artists");

        // Check if input is history
        if (input.toLowerCase().replace(/\s+/g, "") === "history") return (message: Message) => spotifyHistory(message);

        // Check if input is to search last message
        if (input === "^") return (message: Message) => searchLastMessage(message);
    }
}