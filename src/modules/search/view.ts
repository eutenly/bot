import Message from "../../classes/Message/Message";
import richPanel from "./richPanel/main";
import search from "./search";

// TMP
const website = (m: any, link: any) => console.log(link);
// TMP

export default function view(data: any, message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Rich panel
    if (input.toLowerCase().replace(/\s+/g, "") === "richpanel") {

        // No rich panel
        if (!data.richPanel) return message.channel.sendMessage(":x:  **|  There isn't a rich panel**");

        // Run module
        return richPanel(message, data.richPanel);
    }

    // Get results
    const results: string[] = input.split("-");

    // Get result number
    const resultNumber: number = parseInt(results[0]);
    if ((!resultNumber) || (resultNumber < 1)) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Get result
    const result: any = data.results[resultNumber - 1];
    if (!result) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Normal
    if (result.type === "main") {

        // Run module
        website(message, result.link);
    }

    // List, Twitter, Questions, and Item List
    else if (["list", "twitter", "questions", "itemList"].includes(result.type)) {

        // Get subresult number
        const subresultNumber: number = parseInt(results[1]);
        if ((!subresultNumber) || (subresultNumber < 1)) return message.channel.sendMessage(`:x:  **|  That result has multiple subresults. Please enter a subresult, for example \`${prefix}view ${resultNumber}-2\`**`);

        // Get subresult
        const subresultItems: any[] = result.items || result.questions;
        const subresult: any = subresultItems[subresultNumber - 1];
        if (!subresult) return message.channel.sendMessage(":x:  **|  That subresult number is invalid**");

        // Run module
        if (typeof subresult.link === "string") website(message, subresult.link);
        else search(message, subresult.query || subresult);
    }
}