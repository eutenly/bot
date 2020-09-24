import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import article, { url as articleURL } from "../article/main";
import { WikipediaSearchResult } from "./parse";

export default function view(data: WikipediaSearchResult[], message: Message): ViewData | undefined {

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: WikipediaSearchResult = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View article
    return {
        module: () => article(message, result.title),
        url: articleURL(result.title)
    };
}