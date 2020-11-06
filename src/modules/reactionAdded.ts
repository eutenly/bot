import Command, { CommandReaction } from "../classes/Command/Command";
import Reaction from "../classes/Reaction/Reaction";
import setCompactMode from "./reactions/setCompactMode";
import setPage from "./reactions/setPage";

export default async function reactionAdded(reaction: Reaction) {

    // Ignore bots
    if (reaction.user.bot) return;

    // Get command
    const command: Command | undefined = reaction.message.command;
    if (!command) return;

    // Cooldown not done
    if (!reaction.user.checkCooldown()) return;

    // Custom reactions
    if (command.reactions) {

        // Get custom reaction
        const customReaction: CommandReaction | undefined = command.reactions.find((r: CommandReaction) => reaction.client.eutenlyEmojis.get(r.emoji) === reaction.id);

        // Run module
        if (customReaction) return customReaction.module(command);
    }

    // Restrict to command author
    if (reaction.user.id !== command.message.author.id) return;

    // Previous page
    if ((reaction.id === reaction.client.eutenlyEmojis.get("left_arrow")) && (command.searchManager)) setPage(reaction, command, -1);

    // Next page
    else if ((reaction.id === reaction.client.eutenlyEmojis.get("right_arrow")) && (command.searchManager)) setPage(reaction, command, 1);

    // Compact
    else if ((reaction.id === reaction.client.eutenlyEmojis.get("compact")) && (!command.compactMode)) setCompactMode(command, true);

    // Expand
    else if ((reaction.id === reaction.client.eutenlyEmojis.get("expand")) && (command.compactMode)) setCompactMode(command, false);
}