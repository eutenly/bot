import Client from "../../classes/Client/Client";
import Guild from "../../classes/Guild/Guild";

interface EventData {
    guild_id: string;
    roles: string[];
}

export default function guildMemberUpdate(client: Client, data: EventData) {

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guild_id);
    if (!guild) return;

    // Calculate bot permissions
    guild.calculateBotPermissions({
        myRoles: data.roles
    });
}