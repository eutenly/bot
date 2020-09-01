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

    // Get input
    const input = route.inputs.find((routeInput: string) => requestedCommand.startsWith(routeInput));

    // The route has params but the input doesn't have space before params
    if ((route.allowParams) && ((input !== requestedCommand) && (!requestedCommand.startsWith(`${input} `)))) return;

    // The route doesn't have params
    else if ((!route.allowParams) && (input === requestedCommand)) return;

    // Run module
    route.module(message);
}
