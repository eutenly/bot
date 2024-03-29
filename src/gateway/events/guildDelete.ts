import Client from "../../classes/Client/Client";
import Guild from "../../classes/Guild/Guild";

interface GuildDeleteEventData {
    id: string;
    unavailable?: boolean;
}

export default function guildDelete(client: Client, data: GuildDeleteEventData) {

    // Guild unavailable
    if (data.unavailable) return;

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.id);
    if (!guild) throw new Error(`GuildDelete Gateway Event: Guild deleted but isn't cached: ${data.id}`);

    // Remove guild from cache
    client.guilds.delete(guild.id);

    // Emit event
    client.emit("guildDelete", guild);
}