import Message from "../Message/Message";
import Channel, { RawMessage } from "./Channel";

export interface MessageData {
    id: string;
    content?: string;
    authorID?: string;
}

export default async function registerMessage(channel: Channel, data: MessageData): Promise<Message> {

    // Already cached
    const cachedMessage: Message | undefined = channel.messages.get(data.id);
    if (cachedMessage) return cachedMessage;

    // Message needs to be fetched
    if (!data.authorID) {

        // Fetch message
        const rawMessage: RawMessage = await channel.fetchMessage(data.id);

        // Set data
        data.content = rawMessage.content;
        data.authorID = rawMessage.author.id;
    }

    // Create message
    const message = new Message(channel.client, {
        id: data.id,
        content: data.content || "",
        authorID: data.authorID || "",
        channel,
        guild: channel.guild
    });

    // Cache message
    channel.messages.set(message.id, message);

    // Return
    return message;
}