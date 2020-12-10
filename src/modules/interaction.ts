import Interaction from "../classes/Interaction/Interaction";
import interactionRouter from "./commandRouter/interactionRouter";

export default function interactionHandler(interaction: Interaction) {

    // Run router
    const commandRun: boolean = interactionRouter(interaction);

    /**
     * Uncache Interaction
     *
     * If the interaction doesn't run a command and it isn't sent by the client, uncache it
     */
    if ((!commandRun) && (interaction.user.id !== interaction.client.id)) interaction.uncache();
}