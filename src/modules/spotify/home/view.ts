import Message from "../../../classes/Message/Message";
import artist from "../artist/main";
import playlist from "../playlist/main";
import playlists from "../playlists/main";
import track from "../track/main";
import { SpotifyHome } from "./parse";

export default function view(data: SpotifyHome | undefined, message: Message) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  What would you like to view?**");

    // Playlists
    if (input.toLowerCase().replace(/\s+/g, "") === "playlists") return playlists(message);

    // Get item type
    const itemType: string = input.split("-")[0].toLowerCase();
    if (!["p", "t", "a", "r"].includes(itemType)) return message.channel.sendMessage(":x:  **|  That's not something you can view**");

    // Get item number
    const itemNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if (!itemNumber) return message.channel.sendMessage(":x:  **|  That's not something you can view**");
    if (itemNumber < 1) return message.channel.sendMessage(":x:  **|  That item number is invalid**");

    // Get item
    let itemResult: any;
    if (itemType === "p") itemResult = data.playlists[itemNumber - 1];
    else if (itemType === "t") itemResult = data.topTracks[itemNumber - 1];
    else if (itemType === "a") itemResult = data.topArtists[itemNumber - 1];
    else if (itemType === "r") itemResult = data.recentlyPlayed[itemNumber - 1];

    if (!itemResult) return message.channel.sendMessage(":x:  **|  That item number is invalid**");

    // Run module
    if (itemType === "p") playlist(message, itemResult.id);
    else if (itemType === "t") track(message, itemResult.id);
    else if (itemType === "a") artist(message, itemResult.id);
    else if (itemType === "r") track(message, itemResult.id);
}