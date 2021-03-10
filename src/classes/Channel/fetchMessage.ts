import Channel, { RawMessage } from "./Channel";

export default async function fetchMessage(channel: Channel, messageID: string): Promise<RawMessage> {

    // Missing perms
    const permissions: number | undefined = channel.guild?.permissions.get(channel.id);
    if ((permissions) && ((permissions & 0x10000) !== 0x10000)) throw new Error("Missing permissions to view message history");

    // Add to fetch queue
    const message: any = await channel.fetchQueues.fetchMessage.request(`/channels/${channel.id}/messages/${messageID}`);

    // Return
    return message;
}