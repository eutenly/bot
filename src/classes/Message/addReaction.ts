import Message from "../Message/Message";

export default async function addReaction(message: Message, emoji: string): Promise<any> {

    // Send Reaction
    await message.client.fetch(`/channels/${message.channel.id}/messages/${message.id}/reactions/${emoji}/@me`, {method: "PUT"});

    return;
}