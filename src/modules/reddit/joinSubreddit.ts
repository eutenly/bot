import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import PartialReaction from "../../classes/PartialReaction/PartialReaction";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function joinSubreddit(command: Command, user: User, reaction: Reaction | PartialReaction, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(1000);

    // Get connection
    await user.getConnection("reddit");

    // Join subreddit
    const result: any = await fetch(user, command.userRequest, `https://oauth.reddit.com/api/subscribe?action=${action === "added" ? "sub" : "unsub"}&sr_name=${command.data.name}`, "POST");
    if (!result) return;

    // Send
    if (!user.reactionConfirmationsDisabled) command.userRequest.channel.sendMessage(`<:reddit_join:${command.client.eutenlyEmojis.get("reddit_join")}>  **|  <@${user.id}>, ${action === "added" ? "Joined" : "Left"} subreddit**`);

    // Collect stats
    collectStat(command.client, {
        type: "userInitiatedGuildEvent",
        userID: user.id,
        guildID: reaction.guild?.id,
        eventTrigger: "reaction",
        eventService: "reddit",
        eventAction: "joinSubreddit"
    });
}