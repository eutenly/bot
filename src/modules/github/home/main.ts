import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Home embed
    const homeEmbed: Embed = new Embed()
        .setAuthor("GitHub", "https://getdrawings.com/free-icon-bw/github-icon-23.png")
        .setDescription("[Login with GitHub](https://eutenly.com/login/github)")
        .setColor(0x000000)
        .addField("Search GitHub", `Use the \`${prefix}github <Search Query>\` command to search GitHub and get information about repos`)
        .addField("View Details", `The GitHub command can show details about repos, users, issues, PRs, gists, and more`)
        .addField("View Repo Languages", `Use the \`${prefix}view languages\` command while viewing a repo to get a breakdown of the different languages used in that repo`)
        .addField("Gists", `The GitHub command also supports viewing Gists`)
        .addField("Ready to Try It?", "[Login with GitHub](https://eutenly.com/login/github)")
        .setBranding();

    // Create command
    const command: Command = new Command(message.client, {
        name: "githubHome",
        message,
        getURL: (): string => "https://api.github.com/user",
        getExtraData: [
            (): string => "https://api.github.com/user/subscriptions?per_page=5",
            (): string => "https://api.github.com/user/starred?per_page=5",
            (): string => `https://api.github.com/notifications?per_page=5`
        ],
        connectionName: "github",
        homeEmbed,
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);
}