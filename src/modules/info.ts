import mongoose from "mongoose";
import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";

export default async function info(message: Message) {

    // Get memory usage
    const memoryUsage: number = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;

    // Get DB Size
    const dbStats: any = await mongoose.connection.db.stats();
    const dbSize: number = Math.round(dbStats.storageSize / 1024 / 1024 * 100) / 100;

    // Embed
    const embed: Embed = new Embed()
        .setAuthor("Eutenly", message.client.avatarURL, "https://eutenly.com")
        .setDescription("Eutenly is a universal search bot for Discord. Search Google, YouTube, Twitter, Reddit, and a ton more services. We integrate with services allowing for rich displays of information, right in Discord.")
        .setColor(0xf40b3d)
        .addField("Credits", `Developed by [APixel Visuals#2820](https://apixel.me) and [Maia#1234](https://maia.codes)\nHosted by [DigitalOcean](https://m.do.co/c/d3fadd98f126)\nDomain reserved by [NameCheap](https://namecheap.com)`, true)
        .addField("Technical Stats", `**${message.client.guilds.size.toLocaleString()}** Servers\n**${memoryUsage} MB** of memory usage\n**${dbSize} MB** of database space used`, true)
        .addField(null, "[Add Eutenly](https://eutenly.com/invite) \u2022 [Support Server](https://discord.gg/feE2vaR) \u2022 [Website](https://eutenly.com) \u2022 [Vote](https://discordbots.org/bot/733753582507261999) \u2022 [Voter Perks](https://eutenly.com/voter-perks)")
        .setBranding();

    // Send
    message.channel.sendMessage(embed);
}