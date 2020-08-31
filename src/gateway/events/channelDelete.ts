import Client from "../../classes/Client/Client";
import Guild from "../../classes/Guild/Guild";

interface EventData {
    id: string;
    type: number;
    guild_id: string;
}

export default function channelDelete(client: Client, data: EventData) {

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guild_id);
    if (!guild) return;

    // Ignore non text channels
    if ([2, 4].includes(data.type)) return;

    // Remove from denied permissions cache
    guild.deniedPermissions.delete(data.id);
}