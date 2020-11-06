import Client from "../../classes/Client/Client";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";

interface MessageReactionRemoveEventDataEmoji {
    id: string | null;
    name: string;
}

interface MessageReactionRemoveEventData {
    emoji: MessageReactionRemoveEventDataEmoji;
    message_id: string;
    user_id: string;
    channel_id: string;
    guild_id: string;
}

export default async function messageReactionRemove(client: Client, data: MessageReactionRemoveEventData) {

    // Create partial reaction
    const partialReaction: PartialReaction = new PartialReaction(client, {
        id: data.emoji.id || data.emoji.name,
        name: data.emoji.id ? data.emoji.name : undefined,
        messageID: data.message_id,
        userID: data.user_id,
        channelID: data.channel_id,
        guildID: data.guild_id
    });

    await partialReaction.uninitializedMessage;
    if (partialReaction.constructionFailed) return;

    // Emit event
    client.emit("messageReactionRemove", partialReaction);
}