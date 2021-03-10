import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function retweetTweet(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("twitter");

    // Retweet tweet
    const result: any = await fetch(user, command.userRequest, `https://api.twitter.com/1.1/statuses/${action === "added" ? "retweet" : "unretweet"}/${command.data.id}.json`, "POST");
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.userRequest.channel.sendMessage(`<:twitter_retweet:${command.client.eutenlyEmojis.get("twitter_retweet")}>  **|  <@${user.id}>, ${action === "added" ? "Retweeted" : "Unretweeted"} Tweet**`);

    // Collect stats
    collectStat(command.client, {
        type: "userInitiatedGuildEvent",
        userID: user.id,
        guildID: reaction.guild?.id,
        eventTrigger: "reaction",
        eventService: "twitter",
        eventAction: "retweetTweet"
    });
}