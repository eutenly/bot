import Command from "../../classes/Command/Command";
import Embed from "../../classes/Embed/Embed";

export default function setCompactMode(command: Command, compactMode: boolean) {

    // Set cooldown
    command.message.author.setCooldown(2000);

    // Set compact mode
    command.compactMode = compactMode;

    // Get embed
    const embed: Embed = command.getEmbed(command, command.pageManager ? (command.pageManager.cache.get(command.pageManager.page as number) || []) : command.data);

    // Send
    command.send(embed);
}