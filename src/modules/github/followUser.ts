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
    await user.getConnection("github");

    // User is self
    if (command.data.id === user.connections.github?.id) return command.userRequest.respond(`:x:  **|  <@${user.id}>, You can't follow yourself**`);

    // Follow user
    await fetch(user, command.userRequest, `https://api.github.com/user/following/${command.data.name}`, action === "added" ? "PUT" : "DELETE");

    // Send
    if (!user.reactionConfirmationsDisabled) command.userRequest.respond(`<:github_follow:${command.client.eutenlyEmojis.get("github_follow")}>  **|  <@${user.id}>, ${command.data.name} has been ${action === "added" ? "followed" : "unfollowed"}**`);

    // Collect stats
    collectStat(command.client, {
        type: "userInitiatedGuildEvent",
        userID: user.id,
        guildID: reaction.guild?.id,
        eventTrigger: "reaction",
        eventService: "github",
        eventAction: "followUser"
    });
}