import * as Sentry from "@sentry/node";
import Message from "../../classes/Message/Message";
import { routes, BaseCommand } from "./routes";

export default function router(message: Message): boolean {

    // Ignore bots
    if (message.author.bot) return false;

    // Ignore if message doesn't start with the prefix
    if (!message.content.toLowerCase().startsWith(message.channel.prefix)) return false;

    // Get command
    const requestedCommand = message.commandContent.toLowerCase();

    // Parse routes
    let allRoutes: BaseCommand[] = routes;
    if (message.channel.commands) allRoutes = allRoutes.concat(message.channel.commands.commands);

    // Get command route
    const route = allRoutes.find(
        (route: BaseCommand) => route.inputs.some((routeInput: string) => requestedCommand.startsWith(routeInput))
    );

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
