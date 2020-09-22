import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import artist, { url as artistURL } from "../artist/main";
import track, { url as trackURL } from "../track/main";
import tracks, { url as tracksURL } from "../tracks/main";
import { SpotifyAlbum, SpotifyTrack } from "./parse";

export default function view(data: SpotifyAlbum | undefined, message: Message): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Tracks
    if (input.toLowerCase().replace(/\s+/g, "") === "tracks") return {
        module: () => tracks(message, data.id, data.name, "album"),
        url: tracksURL(data.id, "album")
    };

    // Artist
    else if (input.toLowerCase().replace(/\s+/g, "") === "artist") return {
        module: () => artist(message, data.artist.id),
        url: artistURL(data.artist.id)
    };

    // Get track number
    const trackNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!trackNumber) || (trackNumber < 1)) return { error: ":x:  **|  That track number is invalid**" };

    // Get track
    const trackResult: SpotifyTrack = data.tracks[trackNumber - 1];
    if (!trackResult) return { error: ":x:  **|  That track number is invalid**" };

    // Run module
    return {
        module: () => track(message, trackResult.id),
        url: trackURL(trackResult.id)
    };
}