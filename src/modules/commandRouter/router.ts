import Message from "../../classes/Message/Message";
import { routes, Command } from "./routes";

export default function routeMessage(message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Ignore if message doesn't start with the prefix
    if (!message.content.startsWith(prefix)) return;

    // Get command
    const requestedCommand = message.content.substring(prefix.length, message.content.length);

    // Get command route
    const route = routes.find(
        (route: Command) => route.inputs.some((routeInput: string) => requestedCommand.startsWith(routeInput))
    );

    if (!route) return;

    // Check for private commands
    if (route.private) {
        if ((!process.env.OWNERS) || (!process.env.OWNERS.split(",").includes(message.author.id))) return;
    }

    // Get input
    const input = route.inputs.find((routeInput: string) => requestedCommand.startsWith(routeInput));

    // Invalid format
    // ie. `e;helpgoogle` instead of `e;help google`
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
