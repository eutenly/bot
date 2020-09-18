import Message from "../../../classes/Message/Message";
import album from "../album/main";
import artist from "../artist/main";
import { SpotifyArtist, SpotifyTrack } from "./parse";

export default function view(data: SpotifyTrack | undefined, message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  What would you like to view?**");

    // Artist
    if (input.toLowerCase().replace(/\s+/g, "") === "artist") {

        if (data.artists.length > 1) return message.channel.sendMessage(`:x:  **|  There are multiple artists. Please enter an artist number, for example \`${prefix}view a-2\`**`);

        return artist(message, data.artists[0].id);
    }

    // Album
    else if (input.toLowerCase().replace(/\s+/g, "") === "album") return album(message, data.album.id);

    // Get artist number
    const artistNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!artistNumber) || (artistNumber < 1)) return message.channel.sendMessage(":x:  **|  That artist number is invalid**");

    // Get artist
    const artistResult: SpotifyArtist = data.artists[artistNumber - 1];
    if (!artistResult) return message.channel.sendMessage(":x:  **|  That artist number is invalid**");

    // Run module
    artist(message, artistResult.id);
}