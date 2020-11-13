import Client from "../../classes/Client/Client";
import Guild from "../../classes/Guild/Guild";

interface EventData {
    guild_id: string;
    user_id: string;
    roles: string[];
}

export default function guildMemberUpdate(client: Client, data: EventData) {

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guild_id);
    if (!guild) return;

    // Invalidate member cache
    if (guild.memberPerms.has(data.user_id)) guild.memberPerms.delete(data.user_id);

    // Calculate bot permissions if the update is for the bot account
    if (data.user_id === client.id) {
        guild.calculateBotPermissions({
            myRoles: data.roles
        });
    }
}