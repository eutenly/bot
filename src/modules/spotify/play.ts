import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function play(command: Command, user: User, action: CommandReactionModuleAction, reaction?: Reaction) {

    // Reaction is removed
    if (action === "removed") return;

    // Set cooldown
    user.setCooldown(2000);

    // Get connection
    await user.getConnection("spotify");

    // Play
    const result: any = await fetch(user, command.message.channel, "https://api.spotify.com/v1/me/player/play", "PUT", {
        uris: [`spotify:track:${command.data.id}`]
    });

    // Not listening to anything
    if (result.error?.reason === "NO_ACTIVE_DEVICE") return command.message.channel.sendMessage(`:x:  **|  <@${user.id}>, You aren't listening to anything**`);

    // User doesn't have premium
    if (result.error?.reason === "PREMIUM_REQUIRED") return command.message.channel.sendMessage(`:x:  **|  <@${user.id}>, You need to have Spotify Premium in order for bots to be able to control your player**`);

    // Remove reaction
    if (reaction?.guild) reaction.remove();

    // Send
    command.message.channel.sendMessage(`<:spotify_play:${command.client.eutenlyEmojis.get("spotify_play")}>  **|  <@${user.id}>, ${command.data.name} is now playing**`);
}