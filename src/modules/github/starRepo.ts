import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function starRepo(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("github");

    // Star repo
    const result: any = await fetch(user, command.userRequest, `https://api.github.com/user/starred/${command.data.ownerName}/${command.data.name}`, action === "added" ? "PUT" : "DELETE");
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.userRequest.respond(`<:github_star:${command.client.eutenlyEmojis.get("github_star")}>  **|  <@${user.id}>, ${command.data.ownerName}/${command.data.name} has been ${action === "added" ? "starred" : "unstarred"}**`);

    // Collect stats
    collectStat(command.client, {
        type: "userInitiatedGuildEvent",
        userID: user.id,
        guildID: reaction.guild?.id,
        eventTrigger: "reaction",
        eventService: "github",
        eventAction: "starRepo"
    });
}