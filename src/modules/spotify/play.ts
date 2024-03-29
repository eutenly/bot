import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function play(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Reaction is removed
    if (action === "removed") return;

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("spotify");

    // Play
    const result: any = await fetch(user, command.userRequest, "https://api.spotify.com/v1/me/player/play", "PUT", command.name === "track" ?
        { uris: [`spotify:track:${command.data.id}`] } :
        { context_uri: `spotify:${command.name}:${command.data.id}` }
    );
    if (!result) return;

    // Remove reaction
    if ((reaction.guild) && (reaction instanceof Reaction)) reaction.remove();

    // Not listening to anything
    if (result.error?.reason === "NO_ACTIVE_DEVICE") return command.userRequest.channel.sendMessage(`:x:  **|  <@${user.id}>, You aren't listening to anything**`);

    // User doesn't have premium
    if (result.error?.reason === "PREMIUM_REQUIRED") return command.userRequest.channel.sendMessage(`:x:  **|  <@${user.id}>, You need to have Spotify Premium in order for 3rd party services to be able to control your player**`);

    // Send
    if (!user.reactionConfirmationsDisabled) command.userRequest.channel.sendMessage(`<:spotify_play:${command.client.eutenlyEmojis.get("spotify_play")}>  **|  <@${user.id}>, ${command.data.name} is now playing**`);

    // Collect stats
    collectStat(command.client, {
        type: "userInitiatedGuildEvent",
        userID: user.id,
        guildID: reaction.guild?.id,
        eventTrigger: "reaction",
        eventService: "spotify",
        eventAction: "play"
    });
}
