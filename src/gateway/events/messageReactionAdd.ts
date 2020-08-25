import Client from "../../classes/Client";
import Guild from "../../classes/Guild";
import Reaction from "../../classes/Reaction";

interface MessageReactionAddEventDataEmoji {
    id: string | null;
    name: string;
}

interface MessageReactionAddEventData {
    emoji: MessageReactionAddEventDataEmoji;
    message_id: string;
    user_id: string;
    channel_id: string;
    guild_id: string;
}

export default function messageReactionAdd(client: Client, data: MessageReactionAddEventData) {

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guild_id);
    if ((data.guild_id) && (!guild)) throw new Error(`MessageReactionAdd Gateway Event: Message (${data.message_id}) created in channel (${data.channel_id}) but its guild (${data.guild_id}) isn't cached`);

    // Create reaction
    const reaction: Reaction = new Reaction({
        id: data.emoji.id || data.emoji.name,
        messageID: data.message_id,
        userID: data.user_id,
        channelID: data.channel_id,
        guild
    });

    // Emit event
    client.emit("messageReactionAdd", reaction);
}