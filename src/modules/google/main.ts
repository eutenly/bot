import Embed from "../../classes/Embed/Embed";
import Message from "../../classes/Message/Message";
import google from "./google";

export default async function main(message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Get query
    const query = message.content.split(" ").slice(1).join(" ");

    // No query
    if (!query) {

        // Embed
        const embed: Embed = new Embed()
            .setAuthor("Google", "http://pluspng.com/img-png/google-logo-png-open-2000.png")
            .setColor(0x4086f4)
            .addField("Search Google", `Use the \`${prefix}google <Search Query>\` command to search Google`)
            .addField("Knowledge Panels", `Search results with Knowledge Panels can easily be viewed with the \`${prefix}view knowledge panel\` command`)
            .addField("Embeds", `Twitter results, videos, news articles, and more are treated uniquely to display content in an easy to read way`)
            .addField("Lyrics", `Knowledge Panels with song lyrics can be viewed with the \`${prefix}view lyrics\` command`)
            .addField("Ready to Try It?", `Search for something with the \`${prefix}google <Search Query>\` command`)
            .setBranding();

        // Send
        return message.channel.sendMessage(embed);
    }

    // Run module
    google(message, query);
}