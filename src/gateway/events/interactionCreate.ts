import fetch from "node-fetch";
import Client from "../../classes/Client/Client";
import User from "../../classes/User/User";
import Interaction from "../../classes/Interaction/Interaction";
import Channel from "../../classes/Channel/Channel";

interface InteractionEventData {
    token: string; // Interactions token
    member: InteractionMember;
    id: string; // Interaction event ID
    guild_id: string;
    data: InteractionCommand;
    channel_id: string;
}

interface InteractionCommand {
    name: string;
    id: string;
    options: InteractionOptions[];
}

interface InteractionOptions {
    name: string;
    value: string | number;
}

interface InteractionMember {
    user: User;
    roles: string[];
    permissions: string;
}

export default function interactionCreate(client: Client, event: InteractionEventData) {

    // Get channel
    const channel: Channel = client.channels.get(event.channel_id) || new Channel(client, {
        id: event.channel_id,
        guildID: event.guild_id
    });

    const interaction =  new Interaction(client, {
        id: event.id,
        token: event.token,
        commandID: event.data.id,
        parameters: event.data.options,
        user: event.member.user,
        guild: client.guilds.get(event.guild_id),
        channel: channel,
    });

    // Emit event
    client.emit("interaction", interaction);
}
