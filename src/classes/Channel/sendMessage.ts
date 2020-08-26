import { RequestInit } from "node-fetch";
import Message from "../Message/Message";
import Channel from "./Channel";

export default async function sendMessage(channel: Channel, content: string): Promise<Message> {

    // Contruct Payload
    const payload: object = {
        method: "POST",
        body: {
            content
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