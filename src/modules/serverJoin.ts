import Embed from "../classes/Embed/Embed";
import Guild from "../classes/Guild/Guild";
import { Data, Servers } from "../models";
import collectStat from "../util/collectStat";

export default async function serverJoin(guild: Guild) {

    // Get data
    const data = await Data.findOne();

    // Server blocklisted
    if (data?.blocklistedServers?.find((s) => s.id === guild.id)) return guild.leave();

    // Clone detection
    // If this server is detected as a clone of Eutenland, leave it
    const parsedName = guild.name.toLowerCase().replace(/\s+/g, "");
    if (
        (
            parsedName.includes("eutenly") ||
            parsedName.includes("eutenland")
        ) &&
        guild.id !== guild.client.eutenland.id
    ) return guild.leave(":x:  **|  I have left your server due to it being detected as an unauthorized clone of my official server. If you think that this is a mistake, please let my Support Team know in the `#support` channel of my support server at https://discord.gg/feE2vaR**");

    // Create server doc
    Servers.create({ _id: guild.id, compactMode: [] }).catch(() => { });

    // Collect stats
    collectStat(guild.client, {
        measurement: "server_join_leaves",
        tags: {
            type: "join"
        },
        fields: {
            totalServers: guild.client.guilds.size
        }
    });

    // Server join/leave embed
    const joinLeaveEmbed: Embed = new Embed()
        .setAuthor("Server Joined", guild.client.avatarURL)
        .setDescription(guild.name)
        .setColor(0x42f44e)
        .setFooter(guild.id)
        .setTimestamp();

    // Send
    guild.client.serverJoinLeave.sendMessage(joinLeaveEmbed);
}