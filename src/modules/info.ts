import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";

export default async function info(message: Message) {

    // Embed
    const embed: Embed = new Embed()
        .setAuthor("Eutenly", message.client.avatarURL, "https://eutenly.com")
        .setDescription("Eutenly is a universal search bot for Discord. Search the internet, YouTube, Twitter, Reddit, and a ton more services. We integrate with services allowing for rich displays of information, right in Discord.")
        .setColor(0xf40b3d)
        .addField("Developers", "Eutenly is developed by [APixel Visuals#2820](https://apixel.me) and [Maia#1234](https://maia.codes)", true)
        .addField("Servers", `**${message.client.guilds.size.toLocaleString()}** Servers`, true)
        .addField(null, "[Add Eutenly](https://eutenly.com/invite) \u2022 [Support Server](https://discord.gg/feE2vaR) \u2022 [Website](https://eutenly.com) \u2022 [Vote](https://discordbots.org/bot/733753582507261999) \u2022 [Voter Perks](https://eutenly.com/voter-perks)")
        .setBranding();

    // Send
    message.channel.sendMessage(embed);
}