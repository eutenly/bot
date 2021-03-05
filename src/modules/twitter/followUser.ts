import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function followUser(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("twitter");

    // User is self
    if (command.data.id === user.connections.twitter?.id) return command.userRequest.respond(`:x:  **|  <@${user.id}>, You can't follow yourself**`);

    // Follow user
    const result: any = await fetch(user, command.userRequest, `https://api.twitter.com/1.1/friendships/${action === "added" ? "create" : "destroy"}.json?user_id=${command.data.id}`, "POST");
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.userRequest.respond(`<:twitter_follow:${command.client.eutenlyEmojis.get("twitter_follow")}>  **|  <@${user.id}>, ${action === "added" ? "Followed" : "Unfollowed"} user**`);

    // Collect stats
    collectStat(command.client, {
        type: "userInitiatedGuildEvent",
        userID: user.id,
        guildID: reaction.guild?.id,
        eventTrigger: "reaction",
        eventService: "twitter",
        eventAction: "followUser"
    });
}