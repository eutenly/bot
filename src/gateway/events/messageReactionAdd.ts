import Channel from "../../classes/Channel/Channel";
import Client from "../../classes/Client/Client";
import Guild from "../../classes/Guild/Guild";
import Message from "../../classes/Message/Message";
import Reaction from "../../classes/Reaction/Reaction";

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

export default async function messageReactionAdd(client: Client, data: MessageReactionAddEventData) {

    // Create reaction
    const reaction: Reaction = new Reaction(client, {
        id: data.emoji.id || data.emoji.name,
        messageID: data.message_id,
        userID: data.user_id,
        channelID: data.channel_id,
        guildID: data.guild_id
    });

    await reaction.uninitializedMessage;

    // Emit event
    client.emit("messageReactionAdd", reaction);
}