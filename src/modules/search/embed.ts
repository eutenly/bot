import Command from "../../classes/Command/Command";
import Embed from "../../classes/Embed/Embed";

export default function embed(command: Command, data: any): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor(`Search: ${command.pageManager?.input}`, "https://eutenly.com/assets/search-colored.png")
        .setDescription(`Page ${command.pageManager?.page}`)
        .setColor(0x4086f4)
        .setBranding();

    // No data
    if (data.results.length === 0) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    if (data.richPanel) embed
        .addField(null, null, true)
        .addField(null, `**${data.richPanel.link ? `[${data.richPanel.title.title}](${data.richPanel.link})` : data.richPanel.title.title}**${data.richPanel.title.label ? `\n${data.richPanel.title.label}\n` : ""}\n*Use the \`${prefix}view rich panel\` command to get more info about this rich panel*`, true)
        .addField(null, null, true);

    data.results.forEach((r: any, i: number) => {

        /**
         * Normal
         *
         * **1. [Title](https://example.com)**
         * Description
         */
        if (r.type === "main") embed.addField(null, `**${i + 1}. [${r.title}](${r.link})**\n${r.description}`);

        /**
         * News
         *
         * **1. News about Example**
         *
         * **[1-1. Source:](https://example.com)** Title - 1h ago
         * **[1-2. Source:](https://example.com)** Title - 1h ago
         * **[1-3. Source:](https://example.com)** Title - 1h ago
         */
        else if (r.type === "news") {

            // Get items
            const items: string[] = [r.topItem, ...r.items.slice(0, 2)].map((item: any, ii: number) => `**[${i + 1}-${ii + 1}. ${item.source}:](${item.link})** ${item.title} - **${item.time} ago**`);

            // Add field
            embed.addField(null, `**${i + 1}. ${r.title}**\n\n${items.join("\n")}`);
        }

        /**
         * Videos
         *
         * **1. Videos of Example**
         *
         * **[1-1. Source:](https://example.com)** Title - 1 hour ago
         * **[1-2. Source:](https://example.com)** Title - 1 hour ago
         * **[1-3. Source:](https://example.com)** Title - 1 hour ago
         */
        else if (r.type === "videos") {

            // Get items
            const items: string[] = r.items.slice(0, 3).map((item: any, ii: number) => `**[${i + 1}-${ii + 1}. ${item.source}:](${item.link})** ${item.title} - **${item.time}**`);

            // Add field
            embed.addField(null, `**${i + 1}. ${r.title}**\n\n${items.join("\n")}`);
        }

        /**
         * Products
         *
         * **1. Products**
         *
         * **1-1.** Title
         * **1-2.** Title
         * **1-3.** Title
         */
        else if (r.type === "products") {

            // Get items
            const items: string[] = r.items.slice(0, 3).map((item: any, ii: number) => `**${i + 1}-${ii + 1}.** ${item.title}`);

            // Add field
            embed.addField(null, `**${i + 1}. Products**\n\n${items.join("\n")}`);
        }

        /**
         * List
         *
         * **1. [Example](https://example.com)**
         *
         * • Item
         * • Item
         * • Item
         */
        else if (r.type === "list") {

            // Get items
            const items: string[] = r.items.slice(0, 3).map((item: any) => `\u2022 ${item}`);

            // Add field
            embed.addField(null, `**${i + 1}. [${r.title}](${r.link})**\n\n${items.join("\n")}`);
        }
    });

    if (command.compactMode) embed.addField(null, `*\u2022 React or use the \`${prefix}next\` and \`${prefix}previous\` commands to cycle through pages\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result*`);
    else embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}