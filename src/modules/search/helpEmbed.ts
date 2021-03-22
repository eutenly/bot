import Embed from "../../classes/Embed/Embed";

export default new Embed()
    .setAuthor("Search", "https://eutenly.com/assets/search-colored.png")
    .setColor(0x4086f4)
    .addField("Search the Internet", `Use the \`/search\` command to search the internet`)
    .addField("Rich Panels", `Some search results have Rich Panels which can easily be viewed with the \`/view result: rich panel\` command`)
    .addField("Embeds", `Twitter results, videos, news articles, and more are treated uniquely to display content in an easy to read way`)
    .addField("Lyrics", `Rich Panels with song lyrics can be viewed with the \`/view result: lyrics\` command`)
    .addField("Ready to Try It?", `Search for something with the \`/search\` command`)
    .setBranding();