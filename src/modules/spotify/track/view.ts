import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import album, { url as albumURL } from "../album/main";
import artist, { url as artistURL } from "../artist/main";
import { SpotifyArtist, SpotifyTrack } from "./parse";

export default function view(data: SpotifyTrack | undefined, message: Message): ViewData | undefined {

    // Get prefix
    const prefix: string = message.channel.prefix;

    // No data
    if (!data) return;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Artist
    if (input.toLowerCase().replace(/\s+/g, "") === "artist") {

        if (data.artists.length > 1) return { error: `:x:  **|  There are multiple artists. Please enter an artist number, for example \`${prefix}view a-2\`**` };

        return {
            module: () => artist(message, data.artists[0].id),
            url: artistURL(data.artists[0].id)
        };
    }

    // Album
    else if (input.toLowerCase().replace(/\s+/g, "") === "album") return {
        module: () => album(message, data.album.id),
        url: albumURL(data.album.id)
    };

    // Get artist number
    const artistNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!artistNumber) || (artistNumber < 1)) return { error: ":x:  **|  That artist number is invalid**" };

    // Get artist
    const artistResult: SpotifyArtist = data.artists[artistNumber - 1];
    if (!artistResult) return { error: ":x:  **|  That artist number is invalid**" };

    // Run module
    return {
        module: () => artist(message, artistResult.id),
        url: artistURL(artistResult.id)
    };
}