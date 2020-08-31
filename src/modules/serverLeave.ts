import Embed from "../classes/Embed/Embed";
import Guild from "../classes/Guild/Guild";
import { Data } from "../models";

export default async function serverJoin(guild: Guild) {

    // Get data
    const data = await Data.findOne();

    // Server blacklisted
    if (data?.blacklistedServers?.find((s) => s.id === guild.id)) return;

    // Server join/leave embed
    const joinLeaveEmbed: Embed = new Embed()
        .setAuthor("Server Left", guild.client.avatarURL)
        .setDescription(guild.name)
        .setColor(0xf44242)
        .setFooter(guild.id)
        .setTimestamp();

    // Send
    guild.client.serverJoinLeave.sendMessage(joinLeaveEmbed);
}