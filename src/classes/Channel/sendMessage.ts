import { EmbedData } from "../Embed/Embed";
import Message from "../Message/Message";
import messagePayload from "../common/messagePayload";
import Channel from "./Channel";

export default async function sendMessage(channel: Channel, content: string | EmbedData, embed: EmbedData = {}): Promise<Message> {

    // Parse content
    const payloadBody: any = messagePayload(content, embed);

    // Missing perms
    const deniedPermissions: number | undefined = channel.guild?.deniedPermissions.get(channel.id);
    if ((deniedPermissions) && ((deniedPermissions & 0x800) === 0x800)) throw new Error("Missing permissions");
    if ((deniedPermissions) && (Object.keys(payloadBody.embed).length) && ((deniedPermissions & 0x4000) === 0x4000)) throw new Error("Missing permissions");

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

    // Return
    return message;
}