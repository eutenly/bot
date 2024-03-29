import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import album, { url as albumURL } from "../album/main";
import albums, { url as albumsURL } from "../albums/main";
import track, { url as trackURL } from "../track/main";
import tracks, { url as tracksURL } from "../tracks/main";
import { Artist } from "../types";

export default function view(data: Artist | undefined, userRequest: UserRequest): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Top tracks
    if (input.toLowerCase().replace(/\s+/g, "") === "toptracks") return {
        module: () => tracks(userRequest, data.id, data.name, "topTracks"),
        url: tracksURL(data.id, data.name, "topTracks")
    };

    // Albums
    if (input.toLowerCase().replace(/\s+/g, "") === "albums") return {
        module: () => albums(userRequest, data.id, data.name),
        url: albumsURL(data.id)
    };

    // Get item type
    const itemType: string = input.split("-")[0].toLowerCase();
    if (!["t", "a"].includes(itemType)) return { error: ":x:  **|  That's not something you can view**" };

    // Get item number
    const itemNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if (!itemNumber) return { error: ":x:  **|  That's not something you can view**" };
    if (itemNumber < 1) return { error: ":x:  **|  That item number is invalid**" };

    // Get item
    let itemResult: any;
    if (itemType === "t") itemResult = data.topTracks[itemNumber - 1];
    else if (itemType === "a") itemResult = data.albums[itemNumber - 1];

    if (!itemResult) return { error: ":x:  **|  That item number is invalid**" };

    // Run module
    if (itemType === "t") return {
        module: () => track(userRequest, itemResult.id),
        url: trackURL(itemResult.id)
    };
    else if (itemType === "a") return {
        module: () => album(userRequest, itemResult.id),
        url: albumURL(itemResult.id)
    };
}