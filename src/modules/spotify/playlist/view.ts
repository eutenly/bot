import Message from "../../../classes/Message/Message";
import track from "../track/main";
import tracks from "../tracks/main";
import { SpotifyPlaylist, SpotifyTrack } from "./parse";

export default function view(data: SpotifyPlaylist | undefined, message: Message) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  What would you like to view?**");

    // Tracks
    if (input.toLowerCase().replace(/\s+/g, "") === "tracks") return tracks(message, data.id, "playlist");

    // Get track number
    const trackNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!trackNumber) || (trackNumber < 1)) return message.channel.sendMessage(":x:  **|  That track number is invalid**");

    // Get track
    const trackResult: SpotifyTrack = data.tracks[trackNumber - 1];
    if (!trackResult) return message.channel.sendMessage(":x:  **|  That track number is invalid**");

    // Run module
    track(message, trackResult.id);
}