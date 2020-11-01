import Command from "../classes/Command/Command";
import Embed from "../classes/Embed/Embed";
import Reaction from "../classes/Reaction/Reaction";

export default async function reactionRemoved(reaction: Reaction) {

    // Get command
    const command: Command | undefined = reaction.message.command;
    if (!command) return;

    // Restrict to command author
    if (reaction.user.id !== command.message.author.id) return;

    // Cooldown not done
    if (!reaction.user.checkCooldown()) return;

    // Compact
    if ((reaction.id === reaction.client.eutenlyEmojis.get("compact")) && (command.compactMode)) {

        // Set compact mode
        command.compactMode = false;

        // Get embed
        const embed: Embed = command.getEmbed(command, command.searchManager ? (command.searchManager.cache.get(command.searchManager.page as number) || []) : command.data);

        // Send
        command.send(embed);
    }

    // Expand
    else if ((reaction.id === reaction.client.eutenlyEmojis.get("expand")) && (!command.compactMode)) {

        // Set compact mode
        command.compactMode = true;

        // Get embed
        const embed: Embed = command.getEmbed(command, command.searchManager ? (command.searchManager.cache.get(command.searchManager.page as number) || []) : command.data);

        // Send
        command.send(embed);
    }
}