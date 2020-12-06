import Channel from "../../classes/Channel/Channel";
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
    member?: {
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
    let user: User | undefined = client.users.get(data.user_id);

    // No user, but reaction was added in a guild channel
    if ((!user) && (data.member)) user = await client.createUser({
        id: data.user_id,
        tag: `${data.member.user.username}#${data.member.user.discriminator}`,
        bot: Boolean(data.member.user.bot)
    });

    // No user, but reaction was added by client
    if ((!user) && (data.user_id === client.id)) user = await client.createUser({
        id: data.user_id,
        tag: client.tag,
        bot: true
    });

    // No user, and reaction was added in a dm
    if (!user) {

        // Get dm channel data
        const dmChannelData: any = await client.getRawDMChannel(data.user_id);

        // Create user
        user = await client.createUser({
            id: data.user_id,
            tag: `${dmChannelData.recipients[0].username}#${dmChannelData.recipients[0].discriminator}`,
            bot: Boolean(dmChannelData.recipients[0].bot)
        });
    }

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