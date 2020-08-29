import Client from "../../classes/Client/Client";
import Guild, { GuildDataChannel, PermissionOverwrites } from "../../classes/Guild/Guild";

interface EventData {
    id: string;
    type: number;
    parent_id?: string;
    permission_overwrites: PermissionOverwrites[];
    guild_id: string;
}

export default function channelUpdate(client: Client, data: EventData) {

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guild_id);
    if (!guild) return;

    // Ignore voice channels
    if (data.type === 2) return;

    // Get channel data if it isnt a category
    let channelData: GuildDataChannel[] | undefined;
    if (data.type !== 4) channelData = [data];

    // Calculate denied permissions
    guild.calculateDeniedPermissions({
        channels: channelData
    });
}