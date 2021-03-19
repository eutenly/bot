import Embed from "../../classes/Embed/Embed";

export default new Embed()
    .setAuthor("GitHub", "https://i.imgur.com/FwnDNtd.png")
    .setDescription("[Login with GitHub](https://eutenly.com/login/github)")
    .setColor(0x000000)
    .addField("Search GitHub", `Use the \`/github\` command to search GitHub and get information about repos`)
    .addField("View Details", `The GitHub command can show details about repos, users, issues, PRs, gists, and more`)
    .addField("View Repo Languages", `Use the \`/view result: languages\` command while viewing a repo to get a breakdown of the different languages used in that repo`)
    .addField("Gists", `The GitHub command also supports viewing Gists`)
    .addField("Ready to Try It?", "[Login with GitHub](https://eutenly.com/login/github)")
    .setBranding();