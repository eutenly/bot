import { RequestInit } from "node-fetch";
import Message from "../Message/Message";
import Channel from "./Channel";
import { EmbedData } from "./Embed/Embed";

export default async function sendMessage(channel: Channel, content: string = "", embed: EmbedData = {}): Promise<Message> {

    // Contruct Payload
    const payload: object = {
        method: "POST",
        body: {
            content,
            embed
        }
    };

    // Send Message
    const rawMessage = await channel.client.fetch(`/channels/${channel.id}/messages`, payload);

    // Register Message
    const message: Message = await channel.registerMessage({
        id: rawMessage.id,
        content: rawMessage.content,
        authorID: rawMessage.author.id
    });

    return message;
}