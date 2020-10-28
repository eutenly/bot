import Channel from "../Channel/Channel";
import Guild, { GuildDataChannel } from "./Guild";

export default async function findChannel(guild: Guild, input: string, channels?: GuildDataChannel[]): Promise<Channel | undefined> {

    // Parse input
    input = input.toLowerCase().replace(/[<>#]/g, "");

    // Get channel data
    let channelData: GuildDataChannel[] = channels || await guild.getChannels();
    channelData = channelData.filter((c: GuildDataChannel) => ![2, 4].includes(c.type));

    // Define result
    let result: GuildDataChannel | undefined;

    // Find channel by ID
    result = channelData.find((c: GuildDataChannel) => c.id === input);

    // Find channel by case insensitive name match
    if (!result) result = channelData.find((c: GuildDataChannel) => c.name.toLowerCase() === input);

    // Find channel by name starts with
    if (!result) result = channelData.find((c: GuildDataChannel) => c.name.toLowerCase().startsWith(input));

    // Find channel by name includes
    if (!result) result = channelData.find((c: GuildDataChannel) => c.name.toLowerCase().includes(input));

    // No result
    if (!result) return;

    // Get channel
    const channel: Channel = guild.client.channels.get(result.id) || new Channel(guild.client, {
        id: result.id,
        guildID: guild.id
    });

    // Return
    return channel;
}