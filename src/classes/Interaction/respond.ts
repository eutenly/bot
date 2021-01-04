import { EmbedData } from "../Embed/Embed";
import Message from "../Message/Message";
import Interaction from "./Interaction";

export default async function respond(interaction: Interaction, content: string | EmbedData, embed?: EmbedData): Promise<Message> {

    // Add to fetch queue
    await interaction.fetchQueues.respond.request(`/interactions/${interaction.id}/${interaction.token}/callback`, {
        method: "POST",
        body: {
            type: 5
        }
    }, 8);

    // Send message
    const message: Message = await interaction.channel.sendMessage(content, embed);

    // Return
    return message;
}