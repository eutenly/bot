import { EmbedData } from "../Embed/Embed";
import Message from "../Message/Message";
import messagePayload from "../common/messagePayload";
import Channel from "./Channel";

export default async function sendMessage(channel: Channel, content: string | EmbedData, embed: EmbedData = {}): Promise<Message> {

    // Parse content
    const payloadBody: object = messagePayload(content, embed);

    // Contruct Payload
    const payload: object = {
        method: "POST",
        body: payloadBody
    };

    // Add to fetch queue
    const rawMessage: any = await channel.fetchQueues.sendMessage.request(`/channels/${channel.id}/messages`, payload);

    // Register Message
    const message: Message = await channel.registerMessage({
        id: rawMessage.id,
        content: rawMessage.content,
        authorID: rawMessage.author.id
    });

    return message;
}