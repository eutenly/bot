import { EmbedData } from "../Embed/Embed";
import messagePayload from "../common/messagePayload";
import Message from "./Message";

export default async function edit(message: Message, content: string | EmbedData, embed: EmbedData = {}): Promise<void> {

    // Parse content
    const payloadBody: any = messagePayload(content, embed);

    // Missing perms
    const permissions: number | undefined = message.guild?.permissions.get(message.channel.id);
    if ((permissions) && ((permissions & 0x800) !== 0x800)) throw new Error("Missing permissions to send messages");
    if ((permissions) && (Object.keys(payloadBody.embed).length) && ((permissions & 0x4000) !== 0x4000)) throw new Error("Missing permissions to embed links");

    // Contruct Payload
    const payload: object = {
        method: "PATCH",
        body: payloadBody
    };

    // Add to fetch queue
    await message.channel.fetchQueues.sendMessage.request(`/channels/${message.channel.id}/messages/${message.id}`, payload);
}