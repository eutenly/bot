import { EmbedData } from "../Embed/Embed";
import messagePayload from "../common/messagePayload";
import Message from "./Message";

export default async function edit(message: Message, content: string | EmbedData, embed: EmbedData = {}): Promise<void> {

    // Parse content
    const payloadBody: object = messagePayload(content, embed);

    // Contruct Payload
    const payload: object = {
        method: "PATCH",
        body: payloadBody
    };

    // Add to fetch queue
    await message.channel.fetchQueues.sendMessage.request(`/channels/${message.channel.id}/messages/${message.id}`, payload);
}