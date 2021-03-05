import Embed from "../classes/Embed/Embed";
import Guild from "../classes/Guild/Guild";
import { Data } from "../models";
import collectStat from "../util/collectStat";

export default async function serverJoin(guild: Guild) {

    // Get data
    const data = await Data.findOne();

    // Server blocklisted
    if (data?.blocklistedServers?.find((s) => s.id === guild.id)) return;

    // Collect stats
    collectStat(guild.client, {
        type: "guildInitiatedEvent",
        guildID: guild.id,
        event: "serverLeft"
    });

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