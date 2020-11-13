import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import User from "../../classes/User/User";
import fetch from "./fetch";

export default async function retweetTweet(command: Command, user: User, action: CommandReactionModuleAction) {

    // Set cooldown
    user.setCooldown(2000);

    // Get connection
    await user.getConnection("twitter");

    // Like tweet
    await fetch(user, command.message.channel, `https://api.twitter.com/1.1/statuses/${action === "added" ? "retweet" : "unretweet"}/${command.data.id}.json`, "POST");
}