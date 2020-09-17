import Command from "../classes/Command/Command";
import Reaction from "../classes/Reaction/Reaction";

export default async function reactionAdded(reaction: Reaction) {

    // Get command
    const command: Command | undefined = reaction.message.command;
    if ((!command) || (!command.searchManager)) return;

    // Restrict to command author
    if (reaction.user.id !== command.message.author.id) return;

    // Cooldown not done
    if (!reaction.user.checkCooldown()) return;

    // Previous page
    if ((reaction.id === reaction.client.eutenlyEmojis.get("left_arrow")) && (command.searchManager.page)) {

        // Set page
        command.searchManager.setPage(command.searchManager.page - 1);

        // Remove reaction
        return reaction.remove();
    }

    // Next page
    else if ((reaction.id === reaction.client.eutenlyEmojis.get("right_arrow")) && (command.searchManager.page)) {

        // Set page
        command.searchManager.setPage(command.searchManager.page + 1);

        // Remove reaction
        return reaction.remove();
    }
}