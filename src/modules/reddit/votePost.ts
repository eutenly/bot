import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function votePost(command: Command, user: User, action: CommandReactionModuleAction, voteAction: "upvote" | "downvote") {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("reddit");

    // Get vote direction
    let voteDirection: number = 0;
    if ((action === "added") && (voteAction === "upvote")) voteDirection = 1;
    else if ((action === "added") && (voteAction === "downvote")) voteDirection = -1;

    // Vote on post
    const result: any = await fetch(user, command.message.channel, `https://oauth.reddit.com/api/vote?id=t3_${command.data.id}&dir=${voteDirection}`, "POST");
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.message.channel.sendMessage(`<:${voteAction === "upvote" ? "reddit_upvote" : "reddit_downvote"}:${command.client.eutenlyEmojis.get(voteAction === "upvote" ? "reddit_upvote" : "reddit_downvote")}>  **|  <@${user.id}>, ${voteDirection === 0 ? `Removed ${voteAction === "upvote" ? "upvote" : "downvote"} for` : (voteDirection === 1 ? "Upvoted" : "Downvoted")} post**`);
}