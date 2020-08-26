import Channel from "../../classes/Channel";
import Client from "../../classes/Client";
import Message from "../../classes/Message";

interface MessageCreateEventDataAuthor {
    id: string;
}

interface MessageCreateEventData {
    id: string;
    type: number;
    content: string;
    author: MessageCreateEventDataAuthor;
    channel_id: string;
    guild_id: string;
}

export default async function messageCreate(client: Client, data: MessageCreateEventData) {

    // Ignore non default messages
    // https://discord.com/developers/docs/resources/channel#message-object-message-types
    if (data.type !== 0) return;

    // Get channel
    const channel: Channel = client.channels.get(data.channel_id) || new Channel(client, {
        id: data.channel_id,
        guildID: data.guild_id
    });

    // Register message
    const message: Message = await channel.registerMessage({
        id: data.id,
        content: data.content,
        authorID: data.author.id
    });

    // Emit event
    client.emit("message", message);
}