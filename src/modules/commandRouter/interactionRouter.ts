import * as Sentry from "@sentry/node";
import Interaction from "../../classes/Interaction/Interaction";
import UserRequest from "../../classes/UserRequest/UserRequest";
import { routes, CommandRoute } from "./routes";

export default function interactionRouter(interaction: Interaction): boolean {

    // Get command route
    const route = routes.find((route: CommandRoute) => route.id === interaction.commandID);
    if (!route) return false;

    // Cooldown not done
    if (!interaction.user.checkCooldown()) {

        // Get cooldown
        const cooldown: number = Math.ceil((interaction.user.cooldown - Date.now()) / 1000);

        // Respond
        interaction.respond(`:x:  **|  Please wait another ${cooldown} second${cooldown === 1 ? "" : "s"} before using commands**`);

        // Return
        return false;
    }

    // Construct user request
    const userRequest: UserRequest = new UserRequest(interaction.client, {
        commandName: route.name,
        parameters: interaction.parameters,
        source: interaction,
        user: interaction.user,
        channel: interaction.channel,
        guild: interaction.guild
    });

    // Run module
    route.module(userRequest).catch((err) => {

        // Ignore missing permissions to send messages errors
        if (err.message.includes("Missing permissions to send messages")) return;

        // Send error message for missing permissions errors
        if (err.message.includes("Missing permissions")) return interaction.respond(`:x:  **|  ${err.message}. If you need help fixing this issue you can ask on our support server with \`e;support\`**`);

        // Log error
        console.error(err);
        Sentry.captureException(err);

        // Respond
        interaction.respond(":x:  **|  Uh oh, Something went wrong! We've traced the issue and our team has been alerted. If this happens continuously, please report the issue on our support server with `e;support`**");
    });

    // Return
    return true;
}
