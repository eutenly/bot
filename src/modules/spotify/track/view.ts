import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import album, { url as albumURL } from "../album/main";
import artist, { url as artistURL } from "../artist/main";
import { BasicUser, Track } from "../types";

export default function view(data: Track | undefined, userRequest: UserRequest): ViewData | undefined {

    // Get prefix
    const prefix: string = userRequest.channel.prefix;

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Artist
    if (input.toLowerCase().replace(/\s+/g, "") === "artist") {

        if (data.artists.length > 1) return { error: `:x:  **|  There are multiple artists. Please enter an artist number, for example \`${prefix}view a-2\`**` };

        return {
            module: () => artist(userRequest, data.artists[0].id),
            url: artistURL(data.artists[0].id)
        };
    }

    // Album
    else if (input.toLowerCase().replace(/\s+/g, "") === "album") return {
        module: () => album(userRequest, data.album.id),
        url: albumURL(data.album.id)
    };

    // Get artist number
    const artistNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if ((!artistNumber) || (artistNumber < 1)) return { error: ":x:  **|  That artist number is invalid**" };

    // Get artist
    const artistResult: BasicUser = data.artists[artistNumber - 1];
    if (!artistResult) return { error: ":x:  **|  That artist number is invalid**" };

    // Run module
    return {
        module: () => artist(userRequest, artistResult.id),
        url: artistURL(artistResult.id)
    };
}