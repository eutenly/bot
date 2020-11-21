import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function followUser(command: Command, user: User, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("twitter");

    // User is self
    if (command.data.id === user.connections.twitter?.id) return command.message.channel.sendMessage(`:x:  **|  <@${user.id}>, You can't follow yourself**`);

    // Follow user
    const result: any = await fetch(user, command.message.channel, `https://api.twitter.com/1.1/friendships/${action === "added" ? "create" : "destroy"}.json?user_id=${command.data.id}`, "POST");
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.message.channel.sendMessage(`<:twitter_follow:${command.client.eutenlyEmojis.get("twitter_follow")}>  **|  <@${user.id}>, ${action === "added" ? "Followed" : "Unfollowed"} user**`);
}