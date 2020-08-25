import Client from "../../classes/Client";
import Guild from "../../classes/Guild";

interface GuildDeleteEventData {
    id: string;
}

export default function guildDelete(client: Client, data: GuildDeleteEventData) {

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.id);
    if (!guild) throw new Error(`GuildDelete Gateway Event: Guild deleted but isn't cached: ${data.id}`);

    // Remove guild from cache
    client.guilds.delete(guild.id);

    // Emit event
    client.emit("guildDelete", guild);
}