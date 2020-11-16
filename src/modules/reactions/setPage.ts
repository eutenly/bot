import Command from "../../classes/Command/Command";
import Reaction from "../../classes/Reaction/Reaction";

export default function setPage(reaction: Reaction, command: Command, offset: number) {

    // Set page
    command.pageManager?.setPage((command.pageManager.page as number) + offset);

    // Remove reaction
    if (reaction.guild) reaction.remove();
}