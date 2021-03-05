import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function save(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("spotify");

    // Play
    const result: any = await fetch(user, command.userRequest, `https://api.spotify.com/v1/me/tracks?ids=${command.data.id}`, action === "added" ? "PUT" : "DELETE");
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.userRequest.respond(`<:spotify_save:${command.client.eutenlyEmojis.get("spotify_save")}>  **|  <@${user.id}>, ${command.data.name} has been ${action === "added" ? "saved" : "unsaved"}**`);

    // Collect stats
    collectStat(command.client, {
        type: "userInitiatedGuildEvent",
        userID: user.id,
        guildID: reaction.guild?.id,
        eventTrigger: "reaction",
        eventService: "spotify",
        eventAction: "save"
    });
}