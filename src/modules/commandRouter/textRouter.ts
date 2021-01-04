import * as Sentry from "@sentry/node";
import Message from "../../classes/Message/Message";
import UserRequest, { UserRequestParameter } from "../../classes/UserRequest/UserRequest";
import { routes, BOOLEAN, CommandParameter, CommandRoute, CHANNEL, NUMBER, ROLE, STRING, USER } from "./routes";

export default async function textRouter(message: Message): Promise<boolean> {

    // Ignore bots
    if (message.author.bot) return false;

    // Ignore if message doesn't start with the prefix
    if (!message.content.toLowerCase().startsWith(message.channel.prefix)) return false;

    // Get command
    const requestedCommand = message.commandContent.toLowerCase();

    // Parse routes
    let allRoutes: CommandRoute[] = routes;

    // Get command route
    const route = allRoutes.find(
        (route: CommandRoute) => route.inputs.some((routeInput: string) => requestedCommand.startsWith(routeInput))
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

    // Parsed parameters
    interface ParsedParameter {
        type: number;
        value: any;
    }

    // Parse parameters
    const parameters: UserRequestParameter[] = [];
    if (route.parameters) {

        // Get parameters
        const remainingParameters: CommandParameter[] = JSON.parse(JSON.stringify(route.parameters));
        const parsedParameters: Array<ParsedParameter | null> = [];
        const PARAMS: string[] = message.commandContent.split(" ").slice(1);

        // Loop through parameters
        PARAMS.forEach((param: string) => {

            // Number
            const numberParam: number = parseInt(param);
            const numberIndex: number = remainingParameters.findIndex((p: CommandParameter) => p.type === NUMBER);
            if ((numberIndex !== -1) && (!isNaN(numberParam))) {

                // Remove from remaining parameters
                remainingParameters.splice(numberIndex, 1);

                // Add to parsed parameters
                return parsedParameters.push({ type: NUMBER, value: numberParam });
            }

            // Boolean
            const truthy: string[] = ["enabled", "enable", "on", "yes", "y", "true", "add"];
            const falsy: string[] = ["disabled", "disable", "off", "no", "n", "false", "remove"];
            const booleanParam: boolean | undefined = truthy.includes(param) ? true : (falsy.includes(param) ? false : undefined);
            const booleanIndex: number = remainingParameters.findIndex((p: CommandParameter) => p.type === BOOLEAN);
            if ((booleanIndex !== -1) && (booleanParam !== undefined)) {

                // Remove from remaining parameters
                remainingParameters.splice(booleanIndex, 1);

                // Add to parsed parameters
                return parsedParameters.push({ type: BOOLEAN, value: booleanParam });
            }

            // User
            const userParam: string = param.replace(/[<>@!]/g, "");
            const userIndex: number = remainingParameters.findIndex((p: CommandParameter) => p.type === USER);
            if ((userIndex !== -1) && (/^<@!?([0-9]+)>$/.test(param))) {

                // Remove from remaining parameters
                remainingParameters.splice(userIndex, 1);

                // Add to parsed parameters
                return parsedParameters.push({ type: USER, value: userParam });
            }

            // Channel
            const channelParam: string = param.replace(/[<>#]/g, "");
            const channelIndex: number = remainingParameters.findIndex((p: CommandParameter) => p.type === CHANNEL);
            if ((channelIndex !== -1) && (/^<#([0-9]+)>$/.test(param))) {

                // Remove from remaining parameters
                remainingParameters.splice(channelIndex, 1);

                // Add to parsed parameters
                return parsedParameters.push({ type: CHANNEL, value: channelParam });
            }

            // Role
            const roleParam: string = param.replace(/[<>@&]/g, "");
            const roleIndex: number = remainingParameters.findIndex((p: CommandParameter) => p.type === ROLE);
            if ((roleIndex !== -1) && (/^<@&([0-9]+)>$/.test(param))) {

                // Remove from remaining parameters
                remainingParameters.splice(roleIndex, 1);

                // Add to parsed parameters
                return parsedParameters.push({ type: ROLE, value: roleParam });
            }

            // String
            const stringIndex: number = remainingParameters.findIndex((p: CommandParameter) => p.type === STRING);
            if ((stringIndex !== -1) && (param !== "")) {

                // Remove from remaining parameters
                remainingParameters.splice(stringIndex, 1);

                // Add to parsed parameters
                return parsedParameters.push({ type: STRING, value: param });
            }
        });

        // Sort parameters
        route.parameters?.forEach((param: CommandParameter) => {

            // Get parameter index
            const parameterIndex: number = parsedParameters.findIndex((p: ParsedParameter | null) => p && p.type === param.type);
            if (parameterIndex === -1) return parameters.push({ name: param.name });

            // Get parameter
            const parameter: ParsedParameter = parsedParameters[parameterIndex] as ParsedParameter;

            // Remove parsed parameter
            parsedParameters[parameterIndex] = null;

            // Add to parameters
            parameters.push({ name: param.name, value: parameter.value });
        });
    }

    // Construct user request
    const userRequest: UserRequest = new UserRequest(message.client, {
        commandName: route.name,
        parameters,
        source: message,
        user: message.author,
        channel: message.channel,
        guild: message.guild
    });

    // Run module
    route.module(userRequest).catch((err) => {

        // Log error
        console.error(err);
        Sentry.captureException(err);

        // Send
        message.channel.sendMessage(":x:  **|  Uh oh, Something went wrong! We've traced the issue and our team has been alerted. If this happens continuously, please report the issue on our support server with `e;support`**");
    });

    // Return
    return true;
}
