import * as Sentry from "@sentry/node";
import Interaction from "../../classes/Interaction/Interaction";
import { routes, CommandRoute } from "./routes";

export default function interactionRouter(interaction: Interaction): boolean {

    // Get command route
    const route = routes.find((route: CommandRoute) => route.id === interaction.commandID);
    if (!route) return false;

    // Check for private commands
    if (
        route.private &&
        (
            !process.env.OWNERS ||
            !process.env.OWNERS.split(",").includes(message.author.id)
        )
    ) return false;

    // Get input
    const input = route.inputs.find((routeInput: string) => requestedCommand.startsWith(routeInput));

    // Invalid format
    // ie. `e;helpsearch` instead of `e;help search`
    if ((requestedCommand !== input) && (!requestedCommand.startsWith(`${input} `))) return false;

    // Cooldown not done
    if (!message.author.checkCooldown()) {

        // Get cooldown
        const cooldown: number = Math.ceil((message.author.cooldown - Date.now()) / 1000);

        // Send
        message.channel.sendMessage(`:x:  **|  Please wait another ${cooldown} second${cooldown === 1 ? "" : "s"} before using commands**`);

        // Return
        return false;
    }

    // Run module
    route.module(message).catch((err) => {

        // Log error
        console.error(err);
        Sentry.captureException(err);

        // Send
        message.channel.sendMessage(":x:  **|  Uh oh, Something went wrong! We've traced the issue and our team has been alerted. If this happens continuously, please report the issue on our support server with `e;support`**");
    });

    // Return
    return true;
}
