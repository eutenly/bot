import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import channel, { url as channelURL } from "../channel/main";
import playlist, { url as playlistURL } from "../playlist/main";
import video, { url as videoURL } from "../video/main";
import { YouTubeSearchResult } from "./parse";

export default function view(data: YouTubeSearchResult[], message: Message): ViewData | undefined {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: YouTubeSearchResult = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // Run module
    if (result.type === "video") return {
        module: () => video(message, result.id),
        url: videoURL(result.id)
    };
    else if (result.type === "channel") return {
        module: () => channel(message, result.id),
        url: channelURL(result.id)
    };
    else if (result.type === "playlist") return {
        module: () => playlist(message, result.id),
        url: playlistURL(result.id)
    };
}