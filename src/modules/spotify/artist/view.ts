import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import album, { url as albumURL } from "../album/main";
import albums, { url as albumsURL } from "../albums/main";
import { SpotifyAlbum, SpotifyArtist } from "./parse";

export default function view(data: SpotifyArtist | undefined, message: Message): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Albums
    if (input.toLowerCase().replace(/\s+/g, "") === "albums") return {
        module: () => albums(message, data.id, data.name),
        url: albumsURL(data.id)
    };

    // Get album number
    const albumNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!albumNumber) || (albumNumber < 1)) return { error: ":x:  **|  That album number is invalid**" };

    // Get album
    const albumResult: SpotifyAlbum = data.albums[albumNumber - 1];
    if (!albumResult) return { error: ":x:  **|  That album number is invalid**" };

    // Run module
    return {
        module: () => album(message, albumResult.id),
        url: albumURL(albumResult.id)
    };
}