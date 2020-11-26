import Command, { CommandReaction } from "../classes/Command/Command";
import PartialReaction from "../classes/PartialReaction/PartialReaction";
import User from "../classes/User/User";
import setCompactMode from "./reactions/setCompactMode";

export default async function reactionRemoved(partialReaction: PartialReaction) {

    // Get command
    const command: Command | undefined = partialReaction.message.command;
    if (!command) return;

    // Get user
    const user: User | undefined = partialReaction.client.users.get(partialReaction.userID);
    if (!user) return;

    // Ignore bots
    if (user.bot) return;

    // Cooldown not done
    if (!user.checkCooldown()) return;

    // Custom reactions
    if ((command.reactions) && (!command.noData)) {

        // Get custom reaction
        const customReaction: CommandReaction | undefined = command.reactions.find((r: CommandReaction) => partialReaction.client.eutenlyEmojis.get(r.emoji) === partialReaction.id);

        // Run module
        if (customReaction) return customReaction.module(command, user, partialReaction, "removed");
    }

    // Restrict to command author
    if (partialReaction.userID !== command.message.author.id) return;

    // Compact
    if ((partialReaction.id === partialReaction.client.eutenlyEmojis.get("compact")) && (command.compactMode)) setCompactMode(command, false);

    // Expand
    else if ((partialReaction.id === partialReaction.client.eutenlyEmojis.get("expand")) && (!command.compactMode)) setCompactMode(command, true);
}