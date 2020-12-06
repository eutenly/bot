import Command, { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import artist, { url as artistURL } from "../artist/main";
import track, { url as trackURL } from "../track/main";
import { TopItem } from "../types";

export default function view(data: TopItem[], message: Message, command: Command): ViewData | undefined {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: TopItem = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // Run module
    if (command.metadata.type === "tracks") return {
        module: () => track(message, result.id),
        url: trackURL(result.id)
    };
    else if (command.metadata.type === "artists") return {
        module: () => artist(message, result.id),
        url: artistURL(result.id)
    };
}