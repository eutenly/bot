import Channel, { RawMessage } from "./Channel";

export default async function fetchMessage(channel: Channel, messageID: string): Promise<RawMessage> {

    // Missing perms
    const deniedPermissions: number | undefined = channel.guild?.permissions.get(channel.id);
    if ((deniedPermissions) && ((deniedPermissions & 0x10000) !== 0x10000)) throw new Error("Missing permissions");

    // Add to fetch queue
    const message: any = await channel.fetchQueues.fetchMessage.request(`/channels/${channel.id}/messages/${messageID}`);

    // Return
    return message;
}