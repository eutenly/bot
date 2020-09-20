import Embed from "../../classes/Embed/Embed";
import Message from "../../classes/Message/Message";
import linkChecker from "../linkCheckers/wikipedia";
import search from "./search/main";

export default async function main(message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Get input
    const input = message.content.split(" ").slice(1).join(" ");

    // No input
    if (!input) {

        // Embed
        const embed: Embed = new Embed()
            .setAuthor("Wikipedia", "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png")
            .setColor(0xfefefe)
            .addField("Search Wikipedia", `Use the \`${prefix}wikipedia <Search Query>\` command to search for articles on Wikipedia`)
            .addField("View Articles", "View more info about an article from search results")
            .addField("Ready to Try It?", `Search for something with the \`${prefix}wikipedia <Search Query>\` command`)
            .setBranding();

        // Send
        return message.channel.sendMessage(embed);
    }

    // Link checker
    const runModule: Function | undefined = linkChecker(input);
    if (runModule) return runModule(message);

    // Search
    search(message, input);
}