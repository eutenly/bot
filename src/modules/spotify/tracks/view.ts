import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import track, { url as trackURL } from "../track/main";
import { ListedTrack } from "../types";

export default function view(data: ListedTrack[], message: Message): ViewData | undefined {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: ListedTrack = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View track
    return {
        module: () => track(message, result.id),
        url: trackURL(result.id)
    };
}