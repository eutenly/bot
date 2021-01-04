import Interaction, { InteractionParameter } from "../Interaction/Interaction";
import User from "../User/User";
import Channel from "./Channel";

interface InteractionDataUser {
    id: string;
    tag: string;
    bot: boolean;
}

export interface InteractionData {
    id: string;
    token: string;
    commandID: string;
    parameters: InteractionParameter[];
    user: InteractionDataUser;
}

export default async function registerInteraction(channel: Channel, data: InteractionData): Promise<Interaction> {

    // Already cached
    const cachedInteraction: Interaction | undefined = channel.interactions.get(data.id);
    if (cachedInteraction) return cachedInteraction;

    // Get user
    const user: User = await channel.client.createUser({
        id: data.user.id,
        tag: data.user.tag,
        bot: data.user.bot
    });

    // Create interaction
    const interaction: Interaction = new Interaction(channel.client, {
        id: data.id,
        token: data.token,
        commandID: data.commandID,
        parameters: data.parameters,
        user,
        channel,
        guild: channel.guild
    });

    // Cache interaction
    channel.interactions.set(interaction.id, interaction);

    // Return
    return interaction;
}