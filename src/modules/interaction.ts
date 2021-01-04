import Interaction from "../classes/Interaction/Interaction";
import interactionRouter from "./commandRouter/interactionRouter";

export default function interactionHandler(interaction: Interaction) {

    // Run router
    const commandRun: boolean = interactionRouter(interaction);

    /**
     * Uncache Interaction
     *
     * If the interaction doesn't run a command, uncache it
     */
    if (!commandRun) interaction.uncache();
}