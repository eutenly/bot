import Message from "../../classes/Message/Message";
import {routes} from "./routes";

export default function routeMessage(message: Message) {
    if (!message.content.startsWith(`${process.env.DEFAULT_PREFIX}`)) { return; }

    const requestedCommand = message.content.replace(`${process.env.DEFAULT_PREFIX}`, "");

    const route = routes.find(
        (route) => route.inputs.some((routeInput) => requestedCommand.startsWith(routeInput))
    );

    if (!route) { return; }

    if (!route.allowParams) {
        const input = route.inputs.find((routeInput) => requestedCommand.startsWith(routeInput));
        if (input !== requestedCommand) return;
    }

    route.module(message);
}
