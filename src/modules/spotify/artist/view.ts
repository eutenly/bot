import Message from "../../../classes/Message/Message";
import album from "../album/main";
import albums from "../albums/main";
import { SpotifyAlbum, SpotifyArtist } from "./parse";

export default function view(data: SpotifyArtist | undefined, message: Message) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  What would you like to view?**");

    // Albums
    if (input.toLowerCase().replace(/\s+/g, "") === "albums") return albums(message, data.id);

    // Get album number
    const albumNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!albumNumber) || (albumNumber < 1)) return message.channel.sendMessage(":x:  **|  That album number is invalid**");

    // Get album
    const albumResult: SpotifyAlbum = data.albums[albumNumber - 1];
    if (!albumResult) return message.channel.sendMessage(":x:  **|  That album number is invalid**");

    // Run module
    album(message, albumResult.id);
}