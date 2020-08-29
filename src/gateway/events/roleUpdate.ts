import Client from "../../classes/Client/Client";
import Guild, { GuildDataChannel, GuildDataMember, GuildDataRole } from "../../classes/Guild/Guild";

interface EventData {
    guild_id: string;
}

export default async function roleUpdate(client: Client, data: EventData) {

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guild_id);
    if (!guild) return;

    // Get data
    const channelData: Promise<GuildDataChannel[]> = guild.getChannels();
    const roleData: Promise<GuildDataRole[]> = guild.getRoles();
    const selfData: Promise<GuildDataMember> = guild.getMember(client.id);

    // Calculate denied permissions
    guild.calculateDeniedPermissions({
        channels: await channelData,
        rawRoles: await roleData,
        roles: new Map(),
        myRoles: (await selfData).roles,
    });
}