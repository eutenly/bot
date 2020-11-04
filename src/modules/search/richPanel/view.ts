import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import search from "../search";
import lyrics from "./lyrics/main";

export default function view(data: any, message: Message): ViewData | undefined {

    // Get prefix
    const prefix: string = message.channel.prefix;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Lyrics
    if (input.toLowerCase().replace(/\s+/g, "") === "lyrics") {

        // No lyrics
        if (!data.lyrics) return { error: ":x:  **|  That result doesn't have any lyrics**" };

        // Run module
        return {
            module: () => lyrics(message, data)
        };
    }

    // Get results
    const results: string[] = input.toLowerCase().split("-");

    // Get result
    const result: string = results[0];
    const resultNumber: number = parseInt(result);
    if (
        !result ||
        (
            result !== "p" &&
            result !== "rs" &&
            !resultNumber
        ) ||
        (
            resultNumber < 1
        )
    ) return { error: ":x:  **|  That result number is invalid**" };

    // No products
    if ((result === "p") && (!data.products)) return { error: ":x:  **|  That result number is invalid**" };

    // No related searches
    if ((result === "rs") && (!data.relatedSearches)) return { error: ":x:  **|  That result number is invalid**" };

    // No list
    const list = data.list[resultNumber - 1];
    if ((resultNumber) && (!list)) return { error: ":x:  **|  That result number is invalid**" };

    // Get subresult
    const subresultNumber: number = parseInt(results[1]);
    if ((!subresultNumber) || (subresultNumber < 1)) return { error: `:x:  **|  Enter a result and subresult, for example \`${prefix}view ${result}-2\`**` };

    // Get result item
    let resultItem: any;
    if (result === "p") resultItem = data.products[subresultNumber - 1];
    else if (result === "rs") resultItem = data.relatedSearches[subresultNumber - 1];
    else resultItem = list.items[subresultNumber - 1];

    if (!resultItem) return { error: ":x:  **|  That result number is invalid**" };

    // Run module
    return {
        module: () => search(message, resultItem.query),
        url: `eutenly://search?query=${encodeURIComponent(resultItem.query)}`
    };
}