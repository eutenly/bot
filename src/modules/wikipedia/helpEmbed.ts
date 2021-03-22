import Embed from "../../classes/Embed/Embed";

export default new Embed()
    .setAuthor("Wikipedia", "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png")
    .setColor(0xfefefe)
    .addField("Search Wikipedia", `Use the \`/wikipedia\` command to search for articles on Wikipedia`)
    .addField("View Articles", "View more info about an article from search results")
    .addField("Ready to Try It?", `Search for something with the \`/wikipedia\` command`)
    .setBranding();