import Embed from "../../classes/Embed/Embed";

export default new Embed()
    .setAuthor("Reddit", "https://i.imgur.com/YKUi7bl.png")
    .setDescription("[Login with Reddit](https://eutenly.com/login/reddit)")
    .setColor(0xff3f18)
    .addField("Search Reddit", `Use the \`/reddit\` command to search Reddit and get information about subreddits, users, and posts`)
    .addField("View Your Feed", `Use the \`/reddit search-query: feed\` command to view your home feed`)
    .addField("Vote on Posts", "Use the vote reactions below posts to vote on them right from Discord")
    .addField("Save Posts", "Use the save reaction below posts to save it")
    .addField("Ready to Try It?", "[Login with Reddit](https://eutenly.com/login/reddit)")
    .setBranding();