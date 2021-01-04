import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function savePost(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("reddit");

    // Save post
    const result: any = await fetch(user, command.userRequest, `https://oauth.reddit.com/api/${action === "added" ? "save" : "unsave"}?id=t3_${command.data.id}`, "POST");
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.userRequest.respond(`<:reddit_save:${command.client.eutenlyEmojis.get("reddit_save")}>  **|  <@${user.id}>, ${action === "added" ? "Saved" : "Unsaved"} post**`);

    // Collect stats
    collectStat(command.client, {
        measurement: "custom_reactions_used",
        tags: {
            action,
            dms: reaction.guild ? undefined : true,
            confirmationMessageSent: user.reactionConfirmationsDisabled ? undefined : true
        },
        fields: {
            reaction: "savePost",
            commandType: "reddit"
        }
    });
}