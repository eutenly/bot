import Message from "../Message/Message";

export default async function addReaction(message: Message, emoji: string): Promise<void> {

    // Missing perms
    const deniedPermissions: number | undefined = message.guild?.permissions.get(message.channel.id);
    if ((deniedPermissions) && ((deniedPermissions & 0x40) !== 0x40)) throw new Error("Missing permissions");
    if ((deniedPermissions) && (/[A-Za-z0-9_:]/.test(emoji)) && ((deniedPermissions & 0x40000) !== 0x40000)) throw new Error("Missing permissions");

    // Add to fetch queue
    await message.channel.fetchQueues.addReaction.request(`/channels/${message.channel.id}/messages/${message.id}/reactions/${encodeURIComponent(emoji)}/@me`, { method: "PUT" });
}