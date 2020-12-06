import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function likeTweet(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("twitter");

    // Like tweet
    const result: any = await fetch(user, command.message.channel, `https://api.twitter.com/1.1/favorites/${action === "added" ? "create" : "destroy"}.json?id=${command.data.id}`, "POST");
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.message.channel.sendMessage(`<:twitter_like:${command.client.eutenlyEmojis.get("twitter_like")}>  **|  <@${user.id}>, ${action === "added" ? "Liked" : "Unliked"} Tweet**`);

    // Collect stats
    collectStat(command.client, {
        measurement: "custom_reactions_used",
        tags: {
            action,
            dms: reaction.guild ? undefined : true,
            confirmationMessageSent: user.reactionConfirmationsDisabled ? undefined : true
        },
        fields: {
            reaction: "likeTweet",
            commandType: "twitter"
        }
    });
}