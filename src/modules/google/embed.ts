import SearchManager, { CachedResult } from "../../classes/Command/SearchManager/SearchManager";
import Embed from "../../classes/Embed/Embed";

export default function embed(searchManager: SearchManager, cachedResult: CachedResult): Embed {

    // Get prefix
    const prefix: string = searchManager.command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed = new Embed()
        .setAuthor(`Google Search: ${searchManager.query}`, "http://pluspng.com/img-png/google-logo-png-open-2000.png")
        .setDescription(`Page ${cachedResult.page}, About ${cachedResult.metadata.totalResults} results`)
        .setColor(0x4086f4)
        .setBranding();

    // No data
    if (cachedResult.results.length === 0) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    if (cachedResult.metadata.knowledgePanel) embed
        .addField(null, null, true)
        .addField(null, `**${cachedResult.metadata.knowledgePanel.link ? `[${cachedResult.metadata.knowledgePanel.title.title}](${cachedResult.metadata.knowledgePanel.link})` : cachedResult.metadata.knowledgePanel.title.title}**${cachedResult.metadata.knowledgePanel.title.label ? `\n${cachedResult.metadata.knowledgePanel.title.label}\n` : ""}\n*Use the \`${prefix}view knowledge panel\` command to get more info about this knowledge panel*`, true)
        .addField(null, null, true);

    cachedResult.results.forEach((r: any, i: number) => {

        /**
         * Normal
         *
         * **1. [Google](https://google.com)**
         * Search the world's information, including webpages, images, videos and more.
         */
        if (r.type === "main") embed.addField(null, `**${i + 1}. [${r.title}](${r.link})**\n${r.description}`);

        /**
         * List
         *
         * **1. Top stories**
         *
         * **[1-1. Source:](https://example.com)** Title - 1 hour ago
         *
         * **[1-2.](https://example.com)** Title - 1 hour ago
         *
         * **1-3.** Title
         */
        else if (r.type === "list") {

            // Get items
            const items: string[] = r.items.map((item: any, ii: number) => `**${item.link ? "[" : ""}${i + 1}-${ii + 1}.${item.source ? ` ${item.source}:` : ""}${item.link ? `](${item.link})` : ""}** ${item.title.replace(/\n/g, " ")}${item.time ? ` - ${item.time}` : ""}${item.rating ? ` - ${item.rating.rating} (${item.rating.totalRatings} Total Ratings)` : ""}`);

            // Add field
            embed.addField(null, `**${i + 1}. ${r.title}**\n\n${items.join("\n\n")}`);
        }

        /**
         * Twitter
         *
         * **1. [Eutenly (@eutenly) · Twitter](https://twitter.com/eutenly)**
         *
         * **[1-1.](https://twitter.com/eutenly/status/123)** Tweet example - 1 hour ago
         *
         * **[1-2.](https://twitter.com/eutenly/status/456)** Tweet example - 1 hour ago
         *
         * **[1-3.](https://twitter.com/eutenly/status/789)** Tweet example - 1 hour ago
         */
        else if (r.type === "twitter") {

            // Get items
            const items: string[] = r.items.map((item: any, ii: number) => `**[${i + 1}-${ii + 1}.](${item.link})** ${item.text.replace(/\n/g, " ").substring(0, 80)}${item.text.length > 80 ? "..." : ""} - ${item.time}`);

            // Add field
            embed.addField(null, `**${i + 1}. [${r.title}](${r.link})**\n\n${items.join("\n\n")}`);
        }

        /**
         * Questions
         *
         * **1. People Also Ask**
         * **1-1.** Question
         * **1-2.** Question
         * **1-3.** Question
         * **1-4.** Question
         * **1-5.** Question
         */
        else if (r.type === "questions") {

            // Get questions
            const questions: string[] = r.questions.map((q: any, ii: number) => `**${i + 1}-${ii + 1}.** ${q}`);

            // Add field
            embed.addField(null, `**${i + 1}. People Also Ask**\n${questions.join("\n")}`);
        }

        /**
         * Item List
         *
         * **1. Title**
         * [**1-1.** Item], [**1-2.** Item], [**1-3.** Item], [**1-4.** Item], [**1-5.** Item], [**1-6.** Item], [**1-7.** Item]
         */
        else if (r.type === "itemList") {

            // Get items
            const items: string[] = r.items.map((item: any, ii: number) => `[**${i + 1}-${ii + 1}.** ${item.name}]`);

            // Add field
            embed.addField(null, `**${i + 1}. ${r.title}**\n${items.join(", ")}`);
        }
    });

    embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}