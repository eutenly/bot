import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import album from "../album/main";
import artist from "../artist/main";
import search from "../search/main";
import track from "../track/main";
import { SpotifySearchOverview } from "./parse";

export default function view(data: SpotifySearchOverview[] | undefined, message: Message, command: Command) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  What would you like to view?**");

    // Tracks
    if (["tracks", "songs"].includes(input.toLowerCase().replace(/\s+/g, ""))) return search(message, command.metadata.query, "track");

    // Artists
    else if (input.toLowerCase().replace(/\s+/g, "") === "artists") return search(message, command.metadata.query, "artist");

    // Albums
    else if (input.toLowerCase().replace(/\s+/g, "") === "albums") return search(message, command.metadata.query, "album");

    // Playlists
    else if (input.toLowerCase().replace(/\s+/g, "") === "playlists") return search(message, command.metadata.query, "playlist");

    // Episodes
    else if (input.toLowerCase().replace(/\s+/g, "") === "episodes") return search(message, command.metadata.query, "episode");

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Get result
    const result: SpotifySearchOverview = data[resultNumber - 1];
    if (!result) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Run module
    if (result.type === "track") track(message, result.id);
    else if (result.type === "artist") artist(message, result.id);
    else if (result.type === "album") album(message, result.id);
}