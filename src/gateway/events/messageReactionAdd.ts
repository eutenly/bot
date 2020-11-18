import Client from "../../classes/Client/Client";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";

interface MessageReactionAddEventDataEmoji {
    id: string | null;
    name: string;
}

interface MessageReactionAddEventData {
    emoji: MessageReactionAddEventDataEmoji;
    message_id: string;
    user_id: string;
    member: {
        user: {
            username: string;
            discriminator: string;
            bot?: boolean;
        };
    };
    channel_id: string;
    guild_id: string;
}

export default async function messageReactionAdd(client: Client, data: MessageReactionAddEventData) {

    // Get user
    const user: User = await client.createUser({
        id: data.user_id,
        tag: `${data.member.user.username}#${data.member.user.discriminator}`,
        bot: Boolean(data.member.user.bot)
    });

    // Create reaction
    const reaction: Reaction = new Reaction(client, {
        id: data.emoji.id || data.emoji.name,
        name: data.emoji.id ? data.emoji.name : undefined,
        messageID: data.message_id,
        user,
        channelID: data.channel_id,
        guildID: data.guild_id
    });

    await reaction.uninitializedMessage;
    if (reaction.constructionFailed) return;

    // Emit event
    client.emit("messageReactionAdd", reaction);
}