import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function followUser(command: Command, user: User, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("github");

    // User is self
    if (command.data.id === user.connections.github?.id) return command.message.channel.sendMessage(`:x:  **|  <@${user.id}>, You can't follow yourself**`);

    // Follow user
    await fetch(user, command.message.channel, `https://api.github.com/user/following/${command.data.name}`, action === "added" ? "PUT" : "DELETE");

    // Send
    if (!user.reactionConfirmationsDisabled) command.message.channel.sendMessage(`<:github_follow:${command.client.eutenlyEmojis.get("github_follow")}>  **|  <@${user.id}>, ${command.data.name} has been ${action === "added" ? "followed" : "unfollowed"}**`);
}