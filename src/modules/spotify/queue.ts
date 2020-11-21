import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function queue(command: Command, user: User, action: CommandReactionModuleAction, reaction?: Reaction) {

    // Reaction is removed
    if (action === "removed") return;

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("spotify");

    // Queue
    const result: any = await fetch(user, command.message.channel, `https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${command.data.id}`, "POST");

    // Remove reaction
    if (reaction?.guild) reaction.remove();

    // Not listening to anything
    if (result.error?.reason === "NO_ACTIVE_DEVICE") return command.message.channel.sendMessage(`:x:  **|  <@${user.id}>, You aren't listening to anything**`);

    // User doesn't have premium
    if (result.error?.reason === "PREMIUM_REQUIRED") return command.message.channel.sendMessage(`:x:  **|  <@${user.id}>, You need to have Spotify Premium in order for bots to be able to control your player**`);

    // Send
    if (!user.reactionConfirmationsDisabled) command.message.channel.sendMessage(`<:spotify_queue:${command.client.eutenlyEmojis.get("spotify_queue")}>  **|  <@${user.id}>, ${command.data.name} has been queued**`);
}