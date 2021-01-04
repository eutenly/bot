import Embed from "../classes/Embed/Embed";
import UserRequest from "../classes/UserRequest/UserRequest";

export default async function info(userRequest: UserRequest) {

    // Set cooldown
    userRequest.user.setCooldown(2000);

    // Embed
    const embed: Embed = new Embed()
        .setAuthor("Eutenly", userRequest.client.avatarURL, "https://eutenly.com")
        .setDescription("Eutenly is a universal search bot for Discord. Search the internet, YouTube, Twitter, Reddit, and a ton more services. We integrate with services allowing for rich displays of information, right in Discord.")
        .setColor(0xf40b3d)
        .addField("Developers", "Eutenly is developed by [APixel Visuals#2820](https://apixel.me) and [Maia#1234](https://maia.codes)", true)
        .addField("Servers", `**${userRequest.client.guilds.size.toLocaleString()}** Servers`, true)
        .addField(null, "[Add Eutenly](https://eutenly.com/invite) \u2022 [Support Server](https://discord.gg/feE2vaR) \u2022 [Website](https://eutenly.com) \u2022 [Vote](https://discordbots.org/bot/733753582507261999) \u2022 [Voter Perks](https://eutenly.com/voter-perks)")
        .setBranding();

    // Send
    userRequest.respond(embed);
}