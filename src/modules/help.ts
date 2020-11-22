import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";
import githubHelpEmbed from "./github/helpEmbed";
import redditHelpEmbed from "./reddit/helpEmbed";
import searchHelpEmbed from "./search/helpEmbed";
import spotifyHelpEmbed from "./spotify/helpEmbed";
import twitterHelpEmbed from "./twitter/helpEmbed";
import wikipediaHelpEmbed from "./wikipedia/helpEmbed";
import youtubeHelpEmbed from "./youtube/helpEmbed";

export default async function help(message: Message) {

    // Set cooldown
    message.author.setCooldown(2000);

    // Get help module
    const helpModule: string = message.commandContent.split(" ").slice(1).join(" ").toLowerCase().replace(/\s+/g, "");

    // Embed
    const embed: Embed = new Embed()
        .setTitle("Eutenly Help Center")
        .setColor(0xf40b3d)
        .setBranding();

    // Help embeds
    if (helpModule === "search") return message.channel.sendMessage(searchHelpEmbed(message.channel.prefix));
    else if (helpModule === "youtube") return message.channel.sendMessage(youtubeHelpEmbed(message.channel.prefix));
    else if (helpModule === "twitter") return message.channel.sendMessage(twitterHelpEmbed(message.channel.prefix));
    else if (helpModule === "spotify") return message.channel.sendMessage(spotifyHelpEmbed(message.channel.prefix));
    else if (helpModule === "reddit") return message.channel.sendMessage(redditHelpEmbed(message.channel.prefix));
    else if (helpModule === "github") return message.channel.sendMessage(githubHelpEmbed(message.channel.prefix));
    else if (helpModule === "wikipedia") return message.channel.sendMessage(wikipediaHelpEmbed(message.channel.prefix));

    // Navigation
    else if (helpModule === "navigation") embed
        .addField("Navigating Pages", `\u2022 Navigate between pages while viewing results with multiple pages with the <:left_arrow:${message.client.eutenlyEmojis.get("left_arrow")}> and <:right_arrow:${message.client.eutenlyEmojis.get("right_arrow")}> reactions\n\u2022 You can also use the \`${message.channel.prefix}next\` and \`${message.channel.prefix}previous\` commands`)
        .addField("Page Command", `You can also use the \`${message.channel.prefix}page <Page Number>\` command on **some commands** that support it`);

    // View command
    else if (["view", "viewcommand"].includes(helpModule)) embed.addField("View Command", `\u2022 After searching something, you might want more details about a result. You can use the \`${message.channel.prefix}view <Item>\` command to view a result, or other data about something, such as the channel that uploaded a YouTube video\n\u2022 More info about how you can use the View Command can be found around most embeds`);

    // History
    else if (helpModule === "history") embed.addField("History", `\u2022 As you use commands, your last 10 commands are remembered\n\u2022 You can go back and forward between remembered commands with the \`${message.channel.prefix}back\` and \`${message.channel.prefix}forward\` commands`);

    // Saved links
    else if (helpModule === "savedlinks") embed.addField("Saved Links", `\u2022 Eutenly can save links for you with the \`${message.channel.prefix}save <URL>\` command\n\u2022 You can also use the \`${message.channel.prefix}save\` command after viewing any Eutenly result to save it\n\u2022 View your saved links with the \`${message.channel.prefix}savedlinks\` command\n\u2022 When viewing your saved links, you can remove one with the \`${message.channel.prefix}remove <Link Number>\` command`);

    // Compact mode
    else if (helpModule === "compactmode") embed.addField("Compact Mode", `\u2022 Since some embeds can get quite large, Compact Mode let's you tell Eutenly to shrink embeds down\n\u2022 Compact mode is automatically enabled for most channels, except for channels meant for bot commands\n\u2022 Moderators can toggle Compact Mode for a channel with the \`${message.channel.prefix}compact #channel-name enable/disable\` command\n\u2022 You can also toggle Compact Mode for all channels with the \`${message.channel.prefix}compact all enable/disable\` command`);

    // Reaction confirmation messages
    else if (["reactionconfirmations", "reactionconfirms"].includes(helpModule)) embed.addField("Reaction Confirmation Messages", `\u2022 After using reactions, Eutenly let's you know that your reaction worked\n\u2022 Use the \`${message.channel.prefix}reactionconfirms enable/disable\` command to toggle this`);

    // Base help embed
    else embed
        .addField("Basic Commands", `**Ping:** Check if the bot is responsive with \`${message.channel.prefix}ping\`\n**Info:** View information about Eutenly with \`${message.channel.prefix}info\`\n**Help:** View this embed with \`${message.channel.prefix}help\`. You can view more info about some commands with \`${message.channel.prefix}help [Command]\`\n**Invite:** Get the link to invite Eutenly with \`${message.channel.prefix}invite\`\n**Support:** Get the link to Eutenland, our support server, with \`${message.channel.prefix}support\``)
        .addField("Integrations", `**Website:** View a website's info with \`${message.channel.prefix}website <URL>\`\n**Search:** Use \`${message.channel.prefix}help search\` to learn more about the Search command\n**YouTube:** Use \`${message.channel.prefix}help youtube\` to learn more about YouTube integration\n**Twitter:** Use \`${message.channel.prefix}help twitter\` to learn more about Twitter integration\n**Reddit:** Use \`${message.channel.prefix}help reddit\` to learn more about Reddit integration\n**Spotify:** Use \`${message.channel.prefix}help spotify\` to learn more about Spotify integration\n**GitHub:** Use \`${message.channel.prefix}help github\` to learn more about GitHub integration\n**Wikipedia:** Use \`${message.channel.prefix}help wikipedia\` to learn more about Wikipedia integration`)
        .addField("More", `**Navigation:** Use \`${message.channel.prefix}help navigation\` to learn more about navigation\n**View Command:** Use \`${message.channel.prefix}help view\` to learn more about viewing results\n**History:** Use \`${message.channel.prefix}help history\` to learn more about command history\n**Saved Links:** Use \`${message.channel.prefix}help saved links\` to learn more about Saved Links\n**Compact Mode:** Use \`${message.channel.prefix}help compact mode\` to learn more about Compact Mode\n**Reaction Confirmation Messages:** Use \`${message.channel.prefix}help reaction confirms\` to learn more about Reaction Confirmation Messages`);

    // Links
    embed.addField(null, "[Add Eutenly](https://eutenly.com/invite) \u2022 [Support Server](https://discord.gg/feE2vaR) \u2022 [Website](https://eutenly.com) \u2022 [Vote](https://discordbots.org/bot/733753582507261999) \u2022 [Voter Perks](https://eutenly.com/voter-perks)");

    // Send
    message.channel.sendMessage(embed);
}