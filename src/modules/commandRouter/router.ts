import Message from "../../classes/Message/Message";
import { routes, BaseCommand } from "./routes";

export default function routeMessage(message: Message) {

    // Ignore if message doesn't start with the prefix
    if (!message.content.toLowerCase().startsWith(message.channel.prefix)) return;

    // Get command
    const requestedCommand = message.content.toLowerCase().substring(prefix.length, message.content.length);

    // Parse routes
    let allRoutes: BaseCommand[] = routes;
    if (message.channel.commands) allRoutes = allRoutes.concat(message.channel.commands.commands);

    // Get command route
    const route = allRoutes.find(
        (route: BaseCommand) => route.inputs.some((routeInput: string) => requestedCommand.startsWith(routeInput))
    );

    if (!route) return;

    // Check for private commands
    if (
        route.private &&
        (
            !process.env.OWNERS ||
            !process.env.OWNERS.split(",").includes(message.author.id)
        )
    ) return;

    // Get input
    const input = route.inputs.find((routeInput: string) => requestedCommand.startsWith(routeInput));

    // Invalid format
    // ie. `e;helpsearch` instead of `e;help search`
    if ((requestedCommand !== input) && (!requestedCommand.startsWith(`${input} `))) return;

    // Cooldown not done
    if (!message.author.checkCooldown()) {

        // Get cooldown
        const cooldown: number = Math.ceil((message.author.cooldown - Date.now()) / 1000);

        // Send
        return message.channel.sendMessage(`:x:  **|  Please wait another ${cooldown} second${cooldown === 1 ? "" : "s"} before using commands**`);
    }

    // Run module
    route.module(message);
}
