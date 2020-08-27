import { EmbedData } from "../Embed/Embed";
import Message from "../Message/Message";

export default async function sendMessage(message: Message, content: string | EmbedData, embed: EmbedData = {}): Promise<void> {

    // Parse content
    if (typeof content === "object") {
        embed = content;
        content = "";
    }

    // Contruct Payload
    const payload: object = {
        method: "PATCH",
        body: {
            content,
            embed
        }
    };

    // Add to fetch queue
    await message.channel.fetchQueues.sendMessage.request(`/channels/${message.channel.id}/messages/${message.id}`, payload);
}