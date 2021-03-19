import { ViewData } from "../../classes/Command/Command";
import UserRequest from "../../classes/UserRequest/UserRequest";
import website from "../website/website/main";
import video, { url as videoURL } from "../youtube/video/main";
import richPanel from "./richPanel/main";
import search, { url as searchURL } from "./search";

export default function view(data: any, userRequest: UserRequest): ViewData | undefined {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Rich panel
    if (input.toLowerCase().replace(/\s+/g, "") === "richpanel") {

        // No rich panel
        if (!data.richPanel) return { error: ":x:  **|  There isn't a rich panel**" };

        // Run module
        return {
            module: () => richPanel(userRequest, data.richPanel)
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
            module: () => website(userRequest, result.link),
            url: result.link
        };
    }

    // News, videos, products, lists
    else if (["news", "videos", "products", "list"].includes(result.type)) {

        // Get subresult number
        const subresultNumber: number = parseInt(results[1]);
        if ((!subresultNumber) || (subresultNumber < 1)) return { error: `:x:  **|  That result has multiple subresults. Please enter a subresult, for example \`/view result: ${resultNumber}-2\`**` };

        // Get subresult
        const subresultItems: any[] = result.items || result.questions;
        const subresult: any = subresultItems[subresultNumber - 1];
        if (!subresult) return { error: ":x:  **|  That subresult number is invalid**" };

        // Run module
        if (result.type === "videos") return {
            module: () => video(userRequest, subresult.id),
            url: videoURL(subresult.id)
        };
        else if (typeof subresult.link === "string") return {
            module: () => website(userRequest, subresult.link),
            url: subresult.link
        };
        else return {
            module: () => search(userRequest, subresult.query),
            url: searchURL(subresult.query)
        };
    }
}