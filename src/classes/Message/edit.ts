import { EmbedData } from "../Embed/Embed";
import messagePayload from "../common/messagePayload";
import Message from "./Message";

export default async function edit(message: Message, content: string | EmbedData, embed: EmbedData = {}): Promise<void> {

    // Parse content
    const payloadBody: any = messagePayload(content, embed);

    // Missing perms
    const deniedPermissions: number | undefined = message.guild?.deniedPermissions.get(message.channel.id);
    if ((deniedPermissions) && ((deniedPermissions & 0x800) === 0x800)) throw new Error("Missing permissions");
    if ((deniedPermissions) && (Object.keys(payloadBody.embed).length) && ((deniedPermissions & 0x4000) === 0x4000)) throw new Error("Missing permissions");

    // Contruct Payload
    const payload: object = {
        method: "PATCH",
        body: payloadBody
    };

    // Add to fetch queue
    await message.channel.fetchQueues.sendMessage.request(`/channels/${message.channel.id}/messages/${message.id}`, payload);
}