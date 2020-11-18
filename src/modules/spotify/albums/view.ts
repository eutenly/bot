import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import album, { url as albumURL } from "../album/main";
import { ListedAlbum } from "../types";

export default function view(data: ListedAlbum[], message: Message): ViewData | undefined {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: ListedAlbum = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View album
    return {
        module: () => album(message, result.id),
        url: albumURL(result.id)
    };
}