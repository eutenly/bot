import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function savePost(command: Command, user: User, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(2000);

    // Get connection
    await user.getConnection("reddit");

    // Save post
    await fetch(user, command.message.channel, `https://oauth.reddit.com/api/${action === "added" ? "save" : "unsave"}?id=t3_${command.data.id}`, "POST");

    // Send
    command.message.channel.sendMessage(`<:reddit_save:${command.client.eutenlyEmojis.get("reddit_save")}>  **|  <@${user.id}>, ${action === "added" ? "Saved" : "Unsaved"} post**`);
}