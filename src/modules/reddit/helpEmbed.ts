import Embed from "../../classes/Embed/Embed";

export default function helpEmbed(prefix: string): Embed {

    // Return
    return new Embed()
        .setAuthor("Reddit", "https://i.imgur.com/YKUi7bl.png")
        .setDescription("[Login with Reddit](https://eutenly.com/login/reddit)")
        .setColor(0xff3f18)
        .addField("Search Reddit", `Use the \`${prefix}reddit <Search Query>\` command to search Reddit and get information about subreddits, users, and posts`)
        .addField("View Your Feed", `Use the \`${prefix}reddit feed\` command to view your home feed`)
        .addField("Vote on Posts (Coming Soon)", "Use the vote reactions below posts to vote on them right from Discord")
        .addField("Save Posts (Coming Soon)", `Use the \`${prefix}savepost\` command to save the post you're currently viewing`)
        .addField("Ready to Try It?", "[Login with Reddit](https://eutenly.com/login/reddit)")
        .setBranding();
}