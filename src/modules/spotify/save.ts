import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function save(command: Command, user: User, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("spotify");

    // Play
    await fetch(user, command.message.channel, `https://api.spotify.com/v1/me/tracks?ids=${command.data.id}`, action === "added" ? "PUT" : "DELETE");

    // Send
    if (!user.reactionConfirmationsDisabled) command.message.channel.sendMessage(`<:spotify_save:${command.client.eutenlyEmojis.get("spotify_save")}>  **|  <@${user.id}>, ${command.data.name} has been ${action === "added" ? "saved" : "unsaved"}**`);
}