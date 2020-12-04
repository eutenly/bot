import { ViewData } from "../../classes/Command/Command";
import Message from "../../classes/Message/Message";
import website from "../website/website/main";
import video, { url as videoURL } from "../youtube/video/main";
import richPanel from "./richPanel/main";
import search, { url as searchURL } from "./search";

export default function view(data: any, message: Message): ViewData | undefined {

    // Get prefix
    const prefix: string = message.channel.prefix;

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Rich panel
    if (input.toLowerCase().replace(/\s+/g, "") === "richpanel") {

        // No rich panel
        if (!data.richPanel) return { error: ":x:  **|  There isn't a rich panel**" };

        // Run module
        return {
            module: () => richPanel(message, data.richPanel)
        };
    }

    // Get results
    const results: string[] = input.split("-");

    // Get result number
    const resultNumber: number = parseInt(results[0]);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: any = data.results[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // Normal
    if ((result.type === "main") || (result.type === "wikipedia")) {

        // Run module
        return {
            module: () => website(message, result.link),
            url: result.link
        };
    }

    // News, videos, products, lists
    else if (["news", "videos", "products", "list"].includes(result.type)) {

        // Get subresult number
        const subresultNumber: number = parseInt(results[1]);
        if ((!subresultNumber) || (subresultNumber < 1)) return { error: `:x:  **|  That result has multiple subresults. Please enter a subresult, for example \`${prefix}view ${resultNumber}-2\`**` };

        // Get subresult
        const subresultItems: any[] = result.items || result.questions;
        const subresult: any = subresultItems[subresultNumber - 1];
        if (!subresult) return { error: ":x:  **|  That subresult number is invalid**" };

        // Run module
        if (result.type === "videos") return {
            module: () => video(message, subresult.id),
            url: videoURL(subresult.id)
        };
        else if (typeof subresult.link === "string") return {
            module: () => website(message, subresult.link),
            url: subresult.link
        };
        else return {
            module: () => search(message, subresult.query),
            url: searchURL(subresult.query)
        };
    }
}