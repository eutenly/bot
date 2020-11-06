import Channel from "../classes/Channel/Channel";
import { GuildDataChannel } from "../classes/Guild/Guild";
import { GuildPermissions } from "../classes/Guild/getPermissions";
import Message from "../classes/Message/Message";

export default async function compact(message: Message) {

    // Ignore dms
    if (!message.guild) return;

    // Get channel data
    const channelData: GuildDataChannel[] = await message.guild.getChannels();
    const textChannelData: GuildDataChannel[] = channelData.filter((c: GuildDataChannel) => ![2, 4].includes(c.type));

    // Get params
    const PARAMS: string[] = message.commandContent.split(" ").slice(1);
    let target: string = PARAMS[0];
    let input: string = PARAMS[1]?.toLowerCase();

    // Define inputs
    const inputs: string[] = ["enabled", "enable", "disabled", "disable", "yes", "no", "y", "n", "true", "false"];

    // Swap parameters
    if (!inputs.includes(input)) {
        target = PARAMS[1];
        input = PARAMS[0]?.toLowerCase();
    }

    // Invalid input
    if (!inputs.includes(input)) return message.channel.sendMessage(":x:  **|  Please enter if you'd like compact mode to be enabled or disabled**");

    // Get target
    let channel: Channel | undefined;
    if (target?.toLowerCase() !== "all") channel = target ? await message.guild.findChannel(target, textChannelData) : message.channel;
    if ((!channel) && (target?.toLowerCase() !== "all")) return message.channel.sendMessage(":x:  **|  I couldn't find that channel**");

    // Parse input
    const enabled: boolean = ["enabled", "enable", "yes", "y", "true"].includes(input);

    // Missing perms
    const permissions: GuildPermissions = await message.guild.getPermissions({
        channels: channelData,
        userID: message.author.id
    });
    if (
        (
            target?.toLowerCase() === "all" &&
            (permissions.permissions & 0x20) !== 0x20 // manage server
        ) ||
        (
            target?.toLowerCase() !== "all" &&
            (
                ((permissions.channels.get(channel?.id as string) as number) & 0x10) !== 0x10 && // manage channel
                (permissions.permissions & 0x20) !== 0x20 // manage server
            )
        )
    ) return message.channel.sendMessage(":x:  **|  You need the Manage Channel, Manage Server, or Administrator permission to be able to do that**");

    // Set compact mode
    message.guild.setCompactMode(target?.toLowerCase() === "all" ? textChannelData.map((c: GuildDataChannel) => c.id) : (channel?.id as string), enabled);

    // Send
    message.channel.sendMessage(`:white_check_mark:  **|  Compact mode is now ${enabled ? "enabled" : "disabled"} in ${channel ? `<#${channel.id}>` : "all channels"}**`);
}