import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import { ListedVideo } from "../types";
import video, { url as videoURL } from "../video/main";

export default function view(data: ListedVideo[], message: Message): ViewData | undefined {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: ListedVideo = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View video
    return {
        module: () => video(message, result.id),
        url: videoURL(result.id)
    };
}