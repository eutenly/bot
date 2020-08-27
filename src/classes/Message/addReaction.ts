import Message from "../Message/Message";

export default async function addReaction(message: Message, emoji: string): Promise<void> {

    // Add to fetch queue
    await message.channel.fetchQueues.addReaction.request(`/channels/${message.channel.id}/messages/${message.id}/reactions/${emoji}/@me`, { method: "PUT" });
}