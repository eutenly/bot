import { EmbedData } from "../Embed/Embed";
import Message from "../Message/Message";
import messagePayload from "../common/messagePayload";
import Interaction from "./Interaction";

export default async function reply(interaction: Interaction, content: string | EmbedData, embed?: EmbedData): Promise<Message> {

    // Parse content
    const payloadBody: any = messagePayload(content, embed);

    // Contruct Payload
    const payload: object = {
        method: "POST",
        body: payloadBody
    };

    // Add to fetch queue
    const rawMessage: any = await interaction.fetchQueues.reply.request(`/interactions/${interaction.id}/${interaction.token}/callback`, payload, 8);

    // Register Message
    const message: Message = await interaction.channel.registerMessage({
        id: rawMessage.id,
        content: rawMessage.content,
        author: {
            id: rawMessage.author.id,
            tag: `${rawMessage.author.username}#${rawMessage.author.discriminator}`,
            bot: rawMessage.author.bot
        }
    });

    // Return
    return message;
}