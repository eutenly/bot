import Channel, { RawMessage } from "../Channel/Channel";
import Interaction from "../Interaction/Interaction";
import Message from "../Message/Message";

export default async function getLastMessage(channel: Channel, messageOrInteraction: Message | Interaction): Promise<RawMessage | undefined> {

    // Fetch messages
    const messages: RawMessage[] = await channel.fetchMessages({ limit: 20, before: messageOrInteraction });

    // Find last message with content
    const lastMessage: RawMessage | undefined = messages.find((m: RawMessage) => m.content);

    // Return
    return lastMessage;
}