import Command, { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import album, { url as albumURL } from "../album/main";
import artist, { url as artistURL } from "../artist/main";
import episode, { url as episodeURL } from "../episode/main";
import playlist, { url as playlistURL } from "../playlist/main";
import track, { url as trackURL } from "../track/main";
import { SearchResult } from "../types";

export default function view(data: SearchResult[], userRequest: UserRequest, command: Command): ViewData | undefined {

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
    if (command.metadata.type === "track") return {
        module: () => track(userRequest, result.id),
        url: trackURL(result.id)
    };
    else if (command.metadata.type === "artist") return {
        module: () => artist(userRequest, result.id),
        url: artistURL(result.id)
    };
    else if (command.metadata.type === "album") return {
        module: () => album(userRequest, result.id),
        url: albumURL(result.id)
    };
    else if (command.metadata.type === "playlist") return {
        module: () => playlist(userRequest, result.id),
        url: playlistURL(result.id)
    };
    else if (command.metadata.type === "episode") return {
        module: () => episode(userRequest, result.id),
        url: episodeURL(result.id)
    };
}