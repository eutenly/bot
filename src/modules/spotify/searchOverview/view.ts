import Command, { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import album, { url as albumURL } from "../album/main";
import artist, { url as artistURL } from "../artist/main";
import search from "../search/main";
import track, { url as trackURL } from "../track/main";
import { SearchOverviewResult } from "../types";

export default function view(data: SearchOverviewResult[] | undefined, userRequest: UserRequest, command: Command): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Tracks
    if (["tracks", "track", "songs", "song"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => search(userRequest, command.metadata.query, "track")
    };

    // Artists
    else if (["artists", "artist"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => search(userRequest, command.metadata.query, "artist")
    };

    // Albums
    else if (["albums", "album"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => search(userRequest, command.metadata.query, "album")
    };

    // Playlists
    else if (["playlists", "playlist"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => search(userRequest, command.metadata.query, "playlist")
    };

    // Episodes
    else if (["episodes", "episode"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => search(userRequest, command.metadata.query, "episode")
    };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: SearchOverviewResult = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // Run module
    if (result.type === "track") return {
        module: () => track(userRequest, result.id),
        url: trackURL(result.id)
    };
    else if (result.type === "artist") return {
        module: () => artist(userRequest, result.id),
        url: artistURL(result.id)
    };
    else if (result.type === "album") return {
        module: () => album(userRequest, result.id),
        url: albumURL(result.id)
    };
}