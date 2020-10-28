import Client from "../../classes/Client/Client";
import Guild from "../../classes/Guild/Guild";

interface EventData {
    id: string;
    name: string;
    type: number;
    guild_id: string;
}

export default function channelCreate(client: Client, data: EventData) {

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guild_id);
    if (!guild) return;

    // Set name
    if (![2, 4].includes(data.type)) guild.channelNames.set(data.id, data.name);

    // Ignore voice channels
    if (data.type === 2) return;

    // Calculate bot permissions
    guild.calculateBotPermissions();
}