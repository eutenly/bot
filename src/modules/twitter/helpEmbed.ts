import Embed from "../../classes/Embed/Embed";

export default new Embed()
    .setAuthor("Twitter", "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png")
    .setDescription("[Login with Twitter](https://eutenly.com/login/twitter)")
    .setColor(0x1da1f2)
    .addField("Search Twitter", `Use the \`/twitter\` command to search Twitter`)
    .addField("View Tweets", `View Tweets from search results or view a tweets sent by the user you're viewing with the \`/view result: tweets\` command`)
    .addField("View Your Timeline", `Use the \`/twitter search-query: timeline\` command to view your timeline`)
    .addField("Like & Retweet Tweets", `Use the reactions below Tweets to like and retweet them right from Discord`)
    .addField("Ready to Try It?", "[Login with Twitter](https://eutenly.com/login/twitter)")
    .setBranding();