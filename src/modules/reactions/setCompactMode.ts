import Command from "../../classes/Command/Command";
import Embed from "../../classes/Embed/Embed";
import collectStat from "../../util/collectStat";

export default function setCompactMode(command: Command, compactMode: boolean) {

    // Set cooldown
    command.userRequest.user.setCooldown(2000);

    // Set compact mode
    command.compactMode = compactMode;

    // Get embed
    const embed: Embed = command.getEmbed(command, command.pageManager ? (command.pageManager.cache.get(command.pageManager.page as number) || []) : command.data);

    // Send
    command.send(embed);

    // Collect stats
    collectStat(command.client, {
        type: "userInitiatedGuildEvent",
        userID: command.userRequest.user.id,
        guildID: command.userRequest.guild?.id,
        eventTrigger: "reaction",
        eventService: "setCompactMode",
        eventAction: command.compactMode ? "compact" : "expand"
    });
}