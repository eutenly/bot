import Client from "../../classes/Client/Client";
import Guild from "../../classes/Guild/Guild";

interface EventData {
    guild_id: string;
}

export default function roleDelete(client: Client, data: EventData) {

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guild_id);
    if (!guild) return;

    // Invalidate member cache
    guild.memberPerms.clear();

    // Calculate bot permissions
    guild.calculateBotPermissions();
}