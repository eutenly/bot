import Guild, { GuildDataChannel } from "./Guild";

export default async function getChannels(guild: Guild): Promise<GuildDataChannel[]> {

    // Add to fetch queue
    const channels: any = await guild.fetchQueues.getChannels.request(`/guilds/${guild.id}/channels`);

    // Return
    return channels;
}