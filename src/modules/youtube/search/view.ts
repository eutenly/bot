import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import channel, { url as channelURL } from "../channel/main";
import playlist, { url as playlistURL } from "../playlist/main";
import { SearchResult } from "../types";
import video, { url as videoURL } from "../video/main";

export default function view(data: SearchResult[], userRequest: UserRequest): ViewData | undefined {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: SearchResult = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // Run module
    if (result.type === "video") return {
        module: () => video(userRequest, result.id),
        url: videoURL(result.id)
    };
    else if (result.type === "channel") return {
        module: () => channel(userRequest, result.id),
        url: channelURL(result.id)
    };
    else if (result.type === "playlist") return {
        module: () => playlist(userRequest, result.id),
        url: playlistURL(result.id)
    };
}