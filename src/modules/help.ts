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

    // Get command
    const command: string = message.commandContent.split(" ").slice(1).join(" ").toLowerCase().replace(/\s+/g, "");

    // Help embeds
    if (command === "search") return message.channel.sendMessage(searchHelpEmbed(message.channel.prefix));
    else if (command === "youtube") return message.channel.sendMessage(youtubeHelpEmbed(message.channel.prefix));
    else if (command === "twitter") return message.channel.sendMessage(twitterHelpEmbed(message.channel.prefix));
    else if (command === "spotify") return message.channel.sendMessage(spotifyHelpEmbed(message.channel.prefix));
    else if (command === "reddit") return message.channel.sendMessage(redditHelpEmbed(message.channel.prefix));
    else if (command === "github") return message.channel.sendMessage(githubHelpEmbed(message.channel.prefix));
    else if (command === "wikipedia") return message.channel.sendMessage(wikipediaHelpEmbed(message.channel.prefix));

    // Embed
    const embed: Embed = new Embed()
        .setTitle("Eutenly Help Center")
        .setColor(0xf40b3d)
        .addField("Basic Commands", `**Ping:** Check if the bot is responsive with \`${message.channel.prefix}ping\`\n**Info:** View information about Eutenly with \`${message.channel.prefix}info\`\n**Help:** View this embed with \`${message.channel.prefix}help\`. You can view more info about some commands with \`${message.channel.prefix}help [Command]\`\n**Invite:** Get the link to invite Eutenly with \`${message.channel.prefix}invite\`\n**Support:** Get the link to Eutenland, our support server, with \`${message.channel.prefix}support\``)
        .addField("Integrations", `**Website:** View a website's info with \`${message.channel.prefix}website <URL>\`\n**Search:** Use \`${message.channel.prefix}help search\` to learn more about the Search command\n**YouTube:** Use \`${message.channel.prefix}help youtube\` to learn more about YouTube integration\n**Twitter:** Use \`${message.channel.prefix}help twitter\` to learn more about Twitter integration\n**Reddit:** Use \`${message.channel.prefix}help reddit\` to learn more about Reddit integration\n**Spotify:** Use \`${message.channel.prefix}help spotify\` to learn more about Spotify integration\n**GitHub:** Use \`${message.channel.prefix}help github\` to learn more about GitHub integration\n**Wikipedia:** Use \`${message.channel.prefix}help wikipedia\` to learn more about Wikipedia integration`)
        .addField("Navigation", `\u2022 Navigate between pages when viewing results with multiple pages with the <:left_arrow:${message.client.eutenlyEmojis.get("left_arrow")}> and <:right_arrow:${message.client.eutenlyEmojis.get("right_arrow")}> reactions, or the \`${message.channel.prefix}next\` and \`${message.channel.prefix}previous\` commands\n\u2022 You can also use the \`${message.channel.prefix}page <Page Number>\` on **some commands** that support it`)
        .addField("View Command", `\u2022 Use the \`${message.channel.prefix}view <Item>\` command to view more details about a result\n\u2022 More info about how you can use the View Command can be found around most embeds`)
        .addField("History", `\u2022 You can go back and forward between recent commands with the \`${message.channel.prefix}back\` and \`${message.channel.prefix}forward\` commands`)
        .addField("Saved Links", `\u2022 Save links with the \`${message.channel.prefix}save <URL>\` command, or with the \`${message.channel.prefix}save\` command after viewing any Eutenly result\n\u2022 View your saved links with the \`${message.channel.prefix}savedlinks\` command\n\u2022 Remove a saved link with the \`${message.channel.prefix}remove <Link Number>\` command while viewing your saved links`)
        .addField("Compact Mode", `\u2022 Compact Mode let's you tell Eutenly to shrink embeds\n\u2022 Compact mode is automatically enabled for most channels, except for channels meant for bot commands\n\u2022 Moderators can toggle Compact Mode for a channel with the \`${message.channel.prefix}compact #channel-name enable/disable\` command\n\u2022 Moderators can also toggle Compact Mode for all channels with the \`${message.channel.prefix}compact all enable/disable\` command`)
        .addField("Reaction Confirmation Messages", `\u2022 After using reactions, Eutenly let's you know that your reaction worked\n\u2022 Use \`${message.channel.prefix}reactionconfirms enable/disable\` to toggle this`)
        .setBranding();

    // Send
    message.channel.sendMessage(embed);
}