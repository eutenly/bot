import Channel from "../classes/Channel/Channel";
import { GuildDataChannel } from "../classes/Guild/Guild";
import { GuildPermissions } from "../classes/Guild/getPermissions";
import UserRequest from "../classes/UserRequest/UserRequest";

export default async function compact(userRequest: UserRequest) {

    // Get params
    const enabled: boolean | undefined = userRequest.getParameter<boolean>("mode");
    const target: string | undefined = userRequest.getParameter<string>("channel");
    const all: boolean | undefined = userRequest.getParameter<boolean>("all");

    // Invalid input
    if (enabled === undefined) return userRequest.respond(":x:  **|  Please enter if you'd like compact mode to be enabled or disabled**");

    // Get channel data
    let channelData: GuildDataChannel[] | undefined;
    let textChannelData: GuildDataChannel[] | undefined;
    if ((userRequest.guild) && (target)) {
        channelData = await userRequest.guild.getChannels();
        textChannelData = channelData.filter((c: GuildDataChannel) => ![2, 4].includes(c.type));
    }

    // Get target
    let channel: Channel | undefined;
    if ((userRequest.guild) && (target)) {
        if (!all) channel = await userRequest.guild.findChannel(target, textChannelData);
        if ((!channel) && (!all)) return userRequest.respond(":x:  **|  I couldn't find that channel**");
    }

    // Missing perms
    if ((userRequest.guild) && (target)) {
        const permissions: GuildPermissions = await userRequest.guild.getPermissions({
            channels: channelData,
            userID: userRequest.user.id
        });
        if (
            (
                all &&
                (permissions.permissions & 0x20) !== 0x20 // manage server
            ) ||
            (
                !all &&
                (
                    ((permissions.channels.get(channel?.id as string) as number) & 0x10) !== 0x10 && // manage channel
                    (permissions.permissions & 0x20) !== 0x20 // manage server
                )
            )
        ) return userRequest.respond(":x:  **|  You need the Manage Channel, Manage Server, or Administrator permission to be able to do that**");
    }

    // Set compact mode
    if ((userRequest.guild) && (target)) userRequest.guild.setCompactMode(all ? (textChannelData as GuildDataChannel[]).map((c: GuildDataChannel) => c.id) : (channel?.id as string), enabled);
    else userRequest.user.setCompactMode(enabled);

    // Send
    userRequest.respond(`:white_check_mark:  **|  Compact mode is now ${enabled ? "enabled" : "disabled"} ${((userRequest.guild) && (target)) ? `in ${channel ? `<#${channel.id}>` : "all channels"}` : "for your commands"}**`);
}