import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import artist, { url as artistURL } from "../artist/main";
import playlist, { url as playlistURL } from "../playlist/main";
import playlists, { url as playlistsURL } from "../playlists/main";
import track, { url as trackURL } from "../track/main";
import { Home } from "../types";

export default function view(data: Home | undefined, userRequest: UserRequest): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Playlists
    if (input.toLowerCase().replace(/\s+/g, "") === "playlists") return {
        module: () => playlists(userRequest),
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
        module: () => playlist(userRequest, itemResult.id),
        url: playlistURL(itemResult.id)
    };
    else if (itemType === "t") return {
        module: () => track(userRequest, itemResult.id),
        url: trackURL(itemResult.id)
    };
    else if (itemType === "a") return {
        module: () => artist(userRequest, itemResult.id),
        url: artistURL(itemResult.id)
    };
    else if (itemType === "r") return {
        module: () => track(userRequest, itemResult.id),
        url: trackURL(itemResult.id)
    };
}