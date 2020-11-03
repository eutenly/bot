import Channel from "../classes/Channel/Channel";
import { GuildDataChannel } from "../classes/Guild/Guild";
import Message from "../classes/Message/Message";

export default async function compact(message: Message) {

    // Ignore dms
    if (!message.guild) return;

    // Get channel data
    let channelData: GuildDataChannel[] = await message.guild.getChannels();
    channelData = channelData.filter((c: GuildDataChannel) => ![2, 4].includes(c.type));

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
    if (target?.toLowerCase() !== "all") channel = target ? await message.guild.findChannel(target, channelData) : message.channel;
    if ((!channel) && (target?.toLowerCase() !== "all")) return message.channel.sendMessage(":x:  **|  I couldn't find that channel**");

    // Parse input
    const enabled: boolean = ["enabled", "enable", "yes", "y", "true"].includes(input);

    // Missing perms
    const deniedPermissions: number = await message.guild.getDeniedPermissions(
        message.author.id,
        target?.toLowerCase() === "all" ?
            undefined :
            channelData.find((c: GuildDataChannel) => c.id === channel?.id)
    );
    if (
        (
            target?.toLowerCase() === "all" &&
            (deniedPermissions & 0x20) === 0x20 // manage server
        ) ||
        (
            target?.toLowerCase() !== "all" &&
            (
                (deniedPermissions & 0x10) === 0x10 &&  // manage channel
                (deniedPermissions & 0x20) === 0x20     // manage server
            )
        )
    ) return message.channel.sendMessage(":x:  **|  You need the Manage Channel, Manage Server, or Administrator permission to be able to do that**");

    // Set compact mode
    message.guild.setCompactMode(target?.toLowerCase() === "all" ? channelData.map((c: GuildDataChannel) => c.id) : (channel?.id as string), enabled);

    // Send
    message.channel.sendMessage(`:white_check_mark:  **|  Compact mode is now ${enabled ? "enabled" : "disabled"} in ${channel ? `<#${channel.id}>` : "all channels"}**`);
}