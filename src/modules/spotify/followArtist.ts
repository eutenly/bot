import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function followArtist(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("spotify");

    // Follow artist
    const result: any = await fetch(user, command.userRequest, `https://api.spotify.com/v1/me/following?type=artist`, action === "added" ? "PUT" : "DELETE", {
        ids: [command.data.id]
    });
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.userRequest.channel.sendMessage(`<:spotify_follow:${command.client.eutenlyEmojis.get("spotify_follow")}>  **|  <@${user.id}>, ${command.data.name} has been ${action === "added" ? "followed" : "unfollowed"}**`);

    // Collect stats
    collectStat(command.client, {
        type: "userInitiatedGuildEvent",
        userID: user.id,
        guildID: reaction.guild?.id,
        eventTrigger: "reaction",
        eventService: "spotify",
        eventAction: "followArtist"
    });
}