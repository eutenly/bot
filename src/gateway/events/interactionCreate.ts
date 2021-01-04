import Channel from "../../classes/Channel/Channel";
import Client from "../../classes/Client/Client";
import Interaction, { InteractionParameter } from "../../classes/Interaction/Interaction";

interface InteractionCreateEventData {
    id: string; // Interaction event ID
    token: string; // Interactions token
    member: {
        user: InteractionUser;
    };
    guild_id: string;
    data: InteractionCommand;
    channel_id: string;
}

interface InteractionCommand {
    name: string;
    id: string;
    options?: InteractionParameter[];
}

interface InteractionUser {
    id: string;
    username: string;
    discriminator: string;
}

export default async function interactionCreate(client: Client, data: InteractionCreateEventData) {

    // Check if Eutenly is in guild
    if (!client.guilds.get(data.guild_id)) return;

    // Get channel
    const channel: Channel = client.channels.get(data.channel_id) || new Channel(client, {
        id: data.channel_id,
        guildID: data.guild_id
    });

    // Register interaction
    const interaction: Interaction = await channel.registerInteraction({
        id: data.id,
        token: data.token,
        commandID: data.data.id,
        parameters: data.data.options || [],
        user: {
            id: data.member.user.id,
            tag: `${data.member.user.username}#${data.member.user.discriminator}`,
            bot: false
        }
    });

    // Emit event
    client.emit("interaction", interaction);
}
