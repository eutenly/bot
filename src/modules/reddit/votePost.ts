import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function votePost(command: Command, user: User, action: CommandReactionModuleAction, voteAction: "upvote" | "downvote") {

    // Set cooldown
    user.setCooldown(2000);

    // Get connection
    await user.getConnection("reddit");

    // Get vote direction
    let voteDirection: number = 0;
    if ((action === "added") && (voteAction === "upvote")) voteDirection = 1;
    else if ((action === "added") && (voteAction === "downvote")) voteDirection = -1;

    // Vote on post
    await fetch(user, command.message.channel, `https://oauth.reddit.com/api/vote?id=t3_${command.data.id}&dir=${voteDirection}`, "POST");
}