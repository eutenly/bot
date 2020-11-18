import Message from "../Message/Message";
import User from "../User/User";
import Channel, { RawMessage } from "./Channel";

interface MessageDataAuthor {
    id: string;
    tag: string;
    bot: boolean;
}

export interface MessageData {
    id: string;
    content?: string;
    author?: MessageDataAuthor;
}

export default async function registerMessage(channel: Channel, data: MessageData): Promise<Message> {

    // Already cached
    const cachedMessage: Message | undefined = channel.messages.get(data.id);
    if (cachedMessage) return cachedMessage;

    // Message needs to be fetched
    if (!data.author) {

        // Fetch message
        const rawMessage: RawMessage = await channel.fetchMessage(data.id);

        // Set data
        data.content = rawMessage.content;
        data.author = {
            id: rawMessage.author.id,
            tag: `${rawMessage.author.username}#${rawMessage.author.discriminator}`,
            bot: Boolean(rawMessage.author.bot)
        };
    }

    // Get user
    const user: User = await channel.client.createUser({
        id: data.author.id,
        tag: data.author.tag,
        bot: data.author.bot
    });

    // Create message
    const message = new Message(channel.client, {
        id: data.id,
        content: data.content as string,
        author: user,
        channel,
        guild: channel.guild
    });

    // Cache message
    channel.messages.set(message.id, message);

    // Return
    return message;
}