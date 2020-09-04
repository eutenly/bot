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
        if ((!process.env.OWNERS) || (!process.env.OWNERS.split(",").includes(message.authorID))) return;
    }

    // Get input
    const input = route.inputs.find((routeInput: string) => requestedCommand.startsWith(routeInput));

    // Invalid format
    // ie. `e;helpgoogle` instead of `e;help google`
    if ((requestedCommand !== input) && (!requestedCommand.startsWith(`${input} `))) return;

    // Run module
    route.module(message);
}
