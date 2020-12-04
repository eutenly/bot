import { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import search, { url as searchURL } from "../search";

export default function view(data: any, message: Message): ViewData | undefined {

    // Get prefix
    const prefix: string = message.channel.prefix;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get results
    const results: string[] = input.toLowerCase().split("-");

    // Get result
    const result: string = results[0];
    const resultNumber: number = parseInt(result);
    if (
        !result ||
        (
            result !== "s" &&
            !resultNumber
        ) ||
        (
            resultNumber < 1
        )
    ) return { error: ":x:  **|  That result number is invalid**" };

    // No top songs
    if ((result === "s") && (!data.topSongs)) return { error: ":x:  **|  That result number is invalid**" };

    // No list
    const list = data.lists[resultNumber - 1];
    if ((resultNumber) && (!list)) return { error: ":x:  **|  That result number is invalid**" };

    // Get subresult
    const subresultNumber: number = parseInt(results[1]);
    if ((!subresultNumber) || (subresultNumber < 1)) return { error: `:x:  **|  Enter a result and subresult, for example \`${prefix}view ${result}-2\`**` };

    // Get result item
    let resultItem: any;
    if (result === "s") resultItem = data.topSongs[subresultNumber - 1];
    else resultItem = list.items[subresultNumber - 1];

    if (!resultItem) return { error: ":x:  **|  That result number is invalid**" };

    // Run module
    return {
        module: () => search(message, resultItem.query),
        url: searchURL(resultItem.query)
    };
}