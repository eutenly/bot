import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import artist, { url as artistURL } from "../artist/main";
import track, { url as trackURL } from "../track/main";
import tracks, { url as tracksURL } from "../tracks/main";
import { Album, BasicTrack } from "../types";

export default function view(data: Album | undefined, userRequest: UserRequest): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Tracks
    if (input.toLowerCase().replace(/\s+/g, "") === "tracks") return {
        module: () => tracks(userRequest, data.id, data.name, "album"),
        url: tracksURL(data.id, data.name, "album")
    };

    // Artist
    else if (input.toLowerCase().replace(/\s+/g, "") === "artist") return {
        module: () => artist(userRequest, data.artist.id),
        url: artistURL(data.artist.id)
    };

    // Get track number
    const trackNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!trackNumber) || (trackNumber < 1)) return { error: ":x:  **|  That track number is invalid**" };

    // Get track
    const trackResult: BasicTrack = data.tracks[trackNumber - 1];
    if (!trackResult) return { error: ":x:  **|  That track number is invalid**" };

    // Run module
    return {
        module: () => track(userRequest, trackResult.id),
        url: trackURL(trackResult.id)
    };
}