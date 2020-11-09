import Message from "../Message/Message";

export default async function addReaction(message: Message, emoji: string): Promise<void> {

    // Missing perms
    const permissions: number | undefined = message.guild?.permissions.get(message.channel.id);
    if ((permissions) && ((permissions & 0x40) !== 0x40)) throw new Error("Missing permissions");
    if ((permissions) && (/[A-Za-z0-9_:]/.test(emoji)) && ((permissions & 0x40000) !== 0x40000)) throw new Error("Missing permissions");

    // Add to fetch queue
    await message.channel.fetchQueues.addReaction.request(`/channels/${message.channel.id}/messages/${message.id}/reactions/${encodeURIComponent(emoji)}/@me`, { method: "PUT" });
}