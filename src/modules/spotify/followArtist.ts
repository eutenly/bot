import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function followArtist(command: Command, user: User, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("spotify");

    // Follow artist
    const result: any = await fetch(user, command.message.channel, `https://api.spotify.com/v1/me/following?type=artist`, action === "added" ? "PUT" : "DELETE", {
        ids: [command.data.id]
    });
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.message.channel.sendMessage(`<:spotify_follow:${command.client.eutenlyEmojis.get("spotify_follow")}>  **|  <@${user.id}>, ${command.data.name} has been ${action === "added" ? "followed" : "unfollowed"}**`);
}