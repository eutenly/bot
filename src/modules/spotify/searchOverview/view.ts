import Command, { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import album, { url as albumURL } from "../album/main";
import artist, { url as artistURL } from "../artist/main";
import search from "../search/main";
import track, { url as trackURL } from "../track/main";
import { SpotifySearchOverview } from "./parse";

export default function view(data: SpotifySearchOverview[] | undefined, message: Message, command: Command): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Tracks
    if (["tracks", "songs"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => search(message, command.metadata.query, "track")
    };

    // Artists
    else if (input.toLowerCase().replace(/\s+/g, "") === "artists") return {
        module: () => search(message, command.metadata.query, "artist")
    };

    // Albums
    else if (input.toLowerCase().replace(/\s+/g, "") === "albums") return {
        module: () => search(message, command.metadata.query, "album")
    };

    // Playlists
    else if (input.toLowerCase().replace(/\s+/g, "") === "playlists") return {
        module: () => search(message, command.metadata.query, "playlist")
    };

    // Episodes
    else if (input.toLowerCase().replace(/\s+/g, "") === "episodes") return {
        module: () => search(message, command.metadata.query, "episode")
    };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: SpotifySearchOverview = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // Run module
    if (result.type === "track") return {
        module: () => track(message, result.id),
        url: trackURL(result.id)
    };
    else if (result.type === "artist") return {
        module: () => artist(message, result.id),
        url: artistURL(result.id)
    };
    else if (result.type === "album") return {
        module: () => album(message, result.id),
        url: albumURL(result.id)
    };
}