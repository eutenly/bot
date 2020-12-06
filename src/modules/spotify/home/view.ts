import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import artist, { url as artistURL } from "../artist/main";
import playlist, { url as playlistURL } from "../playlist/main";
import playlists, { url as playlistsURL } from "../playlists/main";
import track, { url as trackURL } from "../track/main";
import { Home } from "../types";

export default function view(data: Home | undefined, message: Message): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Playlists
    if (input.toLowerCase().replace(/\s+/g, "") === "playlists") return {
        module: () => playlists(message),
        url: playlistsURL()
    };

    // Get item type
    const itemType: string = input.split("-")[0].toLowerCase();
    if (!["p", "t", "a", "r"].includes(itemType)) return { error: ":x:  **|  That's not something you can view**" };

    // Get item number
    const itemNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if (!itemNumber) return { error: ":x:  **|  That's not something you can view**" };
    if (itemNumber < 1) return { error: ":x:  **|  That item number is invalid**" };

    // Get item
    let itemResult: any;
    if (itemType === "p") itemResult = data.playlists[itemNumber - 1];
    else if (itemType === "t") itemResult = data.topTracks[itemNumber - 1];
    else if (itemType === "a") itemResult = data.topArtists[itemNumber - 1];
    else if (itemType === "r") itemResult = data.recentlyPlayed[itemNumber - 1];

    if (!itemResult) return { error: ":x:  **|  That item number is invalid**" };

    // Run module
    if (itemType === "p") return {
        module: () => playlist(message, itemResult.id),
        url: playlistURL(itemResult.id)
    };
    else if (itemType === "t") return {
        module: () => track(message, itemResult.id),
        url: trackURL(itemResult.id)
    };
    else if (itemType === "a") return {
        module: () => artist(message, itemResult.id),
        url: artistURL(itemResult.id)
    };
    else if (itemType === "r") return {
        module: () => track(message, itemResult.id),
        url: trackURL(itemResult.id)
    };
}