import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function likeTweet(command: Command, user: User, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("twitter");

    // Like tweet
    await fetch(user, command.message.channel, `https://api.twitter.com/1.1/favorites/${action === "added" ? "create" : "destroy"}.json?id=${command.data.id}`, "POST");

    // Send
    if (!user.reactionConfirmationsDisabled) command.message.channel.sendMessage(`<:twitter_like:${command.client.eutenlyEmojis.get("twitter_like")}>  **|  <@${user.id}>, ${action === "added" ? "Liked" : "Unliked"} Tweet**`);
}