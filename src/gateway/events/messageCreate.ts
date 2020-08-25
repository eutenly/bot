import Client from "../../classes/Client";
import Guild from "../../classes/Guild";
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

export default function messageCreate(client: Client, data: MessageCreateEventData) {

    // Ignore non default messages
    // https://discord.com/developers/docs/resources/channel#message-object-message-types
    if (data.type !== 0) return;

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guild_id);
    if (!guild) throw new Error(`MessageCreate Gateway Event: Message (${data.id}) created in channel (${data.channel_id}) but its guild (${data.guild_id}) isn't cached`);

    // Create message
    const message: Message = new Message({
        id: data.id,
        content: data.content,
        authorID: data.author.id,
        channelID: data.channel_id,
        guild
    });

    // Emit event
    client.emit("message", message);
}