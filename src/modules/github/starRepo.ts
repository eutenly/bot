import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function starRepo(command: Command, user: User, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("github");

    // Star repo
    await fetch(user, command.message.channel, `https://api.github.com/user/starred/${command.data.ownerName}/${command.data.name}`, action === "added" ? "PUT" : "DELETE");

    // Send
    if (!user.reactionConfirmationsDisabled) command.message.channel.sendMessage(`<:github_star:${command.client.eutenlyEmojis.get("github_star")}>  **|  <@${user.id}>, ${command.data.ownerName}/${command.data.name} has been ${action === "added" ? "starred" : "unstarred"}**`);
}