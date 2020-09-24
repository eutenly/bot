import Embed from "../../classes/Embed/Embed";

export default function helpEmbed(prefix: string): Embed {

    // Return
    return new Embed()
        .setAuthor("Search", "https://eutenly.com/assets/search-colored.png")
        .setColor(0x4086f4)
        .addField("Search the Internet", `Use the \`${prefix}search <Search Query>\` command to search the internet`)
        .addField("Rich Panels", `Some search results have Rich Panels which can easily be viewed with the \`${prefix}view rich panel\` command`)
        .addField("Embeds", `Twitter results, videos, news articles, and more are treated uniquely to display content in an easy to read way`)
        .addField("Lyrics", `Rich Panels with song lyrics can be viewed with the \`${prefix}view lyrics\` command`)
        .addField("Ready to Try It?", `Search for something with the \`${prefix}search <Search Query>\` command`)
        .setBranding();
}