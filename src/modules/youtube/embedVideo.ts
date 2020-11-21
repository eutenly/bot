import Command, { CommandReactionModuleAction } from "../../classes/Command/Command";
import Reaction from "../../classes/Reaction/Reaction";
import User from "../../classes/User/User";

export default function embedVideo(command: Command, user: User, action: CommandReactionModuleAction, reaction?: Reaction) {

    // Set cooldown
    user.setCooldown(10000);

    // Send
    command.message.channel.sendMessage(`<:youtube:${command.client.eutenlyEmojis.get("youtube")}>  **|  <@${user.id}>, https://youtube.com/watch?v=${command.data.id}**`);

    // Remove reaction
    if (reaction?.guild) reaction.remove();
}