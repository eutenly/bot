import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function joinSubreddit(command: Command, user: User, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(2000);

    // Get connection
    await user.getConnection("reddit");

    // Join subreddit
    await fetch(user, command.message.channel, `https://oauth.reddit.com/api/subscribe?action=${action === "added" ? "sub" : "unsub"}&sr_name=${command.data.name}`, "POST");

    // Send
    if (!user.reactionConfirmationsDisabled) command.message.channel.sendMessage(`<:reddit_join:${command.client.eutenlyEmojis.get("reddit_join")}>  **|  <@${user.id}>, ${action === "added" ? "Joined" : "Left"} subreddit**`);
}