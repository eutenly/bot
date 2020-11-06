import Command from "../../classes/Command/Command";
import Reaction from "../../classes/Reaction/Reaction";

export default function setPage(reaction: Reaction, command: Command, offset: number) {

    // Set page
    command.searchManager?.setPage((command.searchManager.page as number) + offset);

    // Remove reaction
    if (reaction.guild) reaction.remove();
}