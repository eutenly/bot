import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";

export default async function embedVideo(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Reaction is removed
    if (action === "removed") return;

    // Set cooldown
    user.setCooldown(10000);

    // Send
    command.message.channel.sendMessage(`<:youtube:${command.client.eutenlyEmojis.get("youtube")}>  **|  <@${user.id}>, https://youtube.com/watch?v=${command.data.id}**`);

    // Remove reaction
    if ((reaction.guild) && (reaction instanceof Reaction)) reaction.remove();

    // Collect stats
    collectStat(command.client, {
        measurement: "custom_reactions_used",
        tags: {
            dms: reaction.guild ? undefined : true
        },
        fields: {
            reaction: "embedVideo",
            commandType: "youtube"
        }
    });
}