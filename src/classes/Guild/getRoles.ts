import Guild, { GuildDataRole } from "./Guild";

export default async function getRoles(guild: Guild): Promise<GuildDataRole[]> {

    // Add to fetch queue
    const roles: any = await guild.fetchQueues.getRoles.request(`/guilds/${guild.id}/roles`);

    // Return
    return roles;
}