import Client from "../../classes/Client/Client";
import Guild from "../../classes/Guild/Guild";

interface EventData {
    type: number;
    guild_id: string;
}

export default function channelCreate(client: Client, data: EventData) {

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guild_id);
    if (!guild) return;

    // Ignore voice channels
    if (data.type === 2) return;

    // Calculate denied permissions
    guild.calculateDeniedPermissions();
}