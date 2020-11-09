import { RawMessage } from "../Channel/Channel";
import Message from "./Message";

export default async function getLastMessage(message: Message): Promise<RawMessage | undefined> {

    // Fetch messages
    const messages: RawMessage[] = await message.channel.fetchMessages({ limit: 20, before: message });

    // Find last message with content
    const lastMessage: RawMessage | undefined = messages.find((m: RawMessage) => m.content);

    // Return
    return lastMessage;
}