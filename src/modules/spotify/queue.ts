import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function queue(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Reaction is removed
    if (action === "removed") return;

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("spotify");

    // Queue
    const result: any = await fetch(user, command.userRequest, `https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${command.data.id}`, "POST");
    if (!result) return;

    // Remove reaction
    if ((reaction.guild) && (reaction instanceof Reaction)) reaction.remove();

    // Not listening to anything
    if (result.error?.reason === "NO_ACTIVE_DEVICE") return command.userRequest.respond(`:x:  **|  <@${user.id}>, You aren't listening to anything**`);

    // User doesn't have premium
    if (result.error?.reason === "PREMIUM_REQUIRED") return command.userRequest.respond(`:x:  **|  <@${user.id}>, You need to have Spotify Premium in order for bots to be able to control your player**`);

    // Send
    if (!user.reactionConfirmationsDisabled) command.userRequest.respond(`<:spotify_queue:${command.client.eutenlyEmojis.get("spotify_queue")}>  **|  <@${user.id}>, ${command.data.name} has been queued**`);

    // Collect stats
    collectStat(command.client, {
        measurement: "custom_reactions_used",
        tags: {
            dms: reaction.guild ? undefined : true,
            confirmationMessageSent: user.reactionConfirmationsDisabled ? undefined : true
        },
        fields: {
            reaction: "queue",
            commandType: "spotify"
        }
    });
}