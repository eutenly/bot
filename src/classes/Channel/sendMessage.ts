import Message from "../Message/Message";
import RateLimit from "../common/RateLimit";
import Channel from "./Channel";

export default async function sendMessage(channel: Channel, content: string): Promise<Message> {

    // Contruct Payload
    const payload: object = {
        method: "POST",
        body: {
            content
        }
    };

    // Add to fetch queue
    const rawMessage: any = await channel.fetchQueues.sendMessage.request(payload);

    // Register Message
    const message: Message = await channel.registerMessage({
        id: rawMessage.id,
        content: rawMessage.content,
        authorID: rawMessage.author.id
    });

    return message;
}