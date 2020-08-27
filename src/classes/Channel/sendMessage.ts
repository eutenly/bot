import Message from "../Message/Message";
import Channel from "./Channel";
import { EmbedData } from "./Embed/Embed";

export default async function sendMessage(channel: Channel, content: string | EmbedData, embed: EmbedData = {}): Promise<Message> {

    // Parse content
    if (typeof content === "object") {
        embed = content;
        content = "";
    }

    // Contruct Payload
    const payload: object = {
        method: "POST",
        body: {
            content,
            embed
        }
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