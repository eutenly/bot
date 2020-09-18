import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import User from "../../../classes/User/User";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Home embed
    const homeEmbed: Embed = new Embed()
        .setAuthor("Twitter", "https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png")
        .setDescription("[Login with Twitter](https://eutenly.com/login/twitter)")
        .setColor(0x1da1f2)
        .addField("Search Twitter", `Use the \`${prefix}twitter <Search Query>\` command to search Twitter`)
        .addField("View Tweets", `View Tweets from search results or view a tweets sent by the user you're viewing with the \`${prefix}view tweets\` command`)
        .addField("View Your Timeline", `Use the \`${prefix}twitter timeline\` command to view your timeline`)
        .addField("Ready to Try It?", "[Login with Twitter](https://eutenly.com/login/twitter)")
        .setBranding();

    // Create command
    const command: Command = new Command(message.client, {
        name: "twitterHome",
        message,
        getURL: (input?: string, page?: number, nextPageToken?: string, user?: User): string => `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${user?.connections["twitter"]?.id}&tweet_mode=extended&count=5`,
        getExtraData: [(): string => "https://api.twitter.com/1.1/statuses/home_timeline.json?tweet_mode=extended&count=5"],
        connectionName: "twitter",
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