import { ViewData } from "../../classes/Command/Command";
import Message from "../../classes/Message/Message";
import { SavedLink } from "../../models/users";
import website from "../website/website/main";

export default function view(data: SavedLink[], message: Message): ViewData | undefined {

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: SavedLink = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View website
    return {
        module: () => website(message, result.url)
    };
}