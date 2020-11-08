import Command from "../classes/Command/Command";
import PartialReaction from "../classes/PartialReaction/PartialReaction";
import User from "../classes/User/User";
import setCompactMode from "./reactions/setCompactMode";

export default async function reactionRemoved(partialReaction: PartialReaction) {

    // Get command
    const command: Command | undefined = partialReaction.message.command;
    if (!command) return;

    // Restrict to command author
    if (partialReaction.userID !== command.message.author.id) return;

    // Get user
    const user: User = partialReaction.client.users.get(partialReaction.userID) || new User(partialReaction.client, {
        id: partialReaction.userID,
        bot: false
    });

    // Cooldown not done
    if (!user.checkCooldown()) return;

    // Compact
    if ((partialReaction.id === partialReaction.client.eutenlyEmojis.get("compact")) && (command.compactMode)) setCompactMode(command, false);

    // Expand
    else if ((partialReaction.id === partialReaction.client.eutenlyEmojis.get("expand")) && (!command.compactMode)) setCompactMode(command, true);
}