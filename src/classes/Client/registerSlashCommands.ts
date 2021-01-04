import { routes, CommandRoute } from "../../modules/commandRouter/routes";
import Client from "./Client";

export default async function registerSlashCommands(client: Client) {

    // Commands endpoint
    const ENDPOINT = process.env.DEV === "true" ? `/applications/${client.id}/guilds/733725629769318461/commands` : `/applications/${client.id}/commands`;

    // Fetch existing commands
    const registeredCommands = await client.fetchQueues.fetchSlashCommands.request(ENDPOINT, undefined, 8);

    // Process existing commands
    registeredCommands.forEach((command: any) => {

        // Command still exists
        if (routes.find((route: any) => command.name === route.name)) return;

        // Unregister command
        client.fetchQueues.unregisterSlashCommand.request(`${ENDPOINT}/${command.id}`, {
            method: "DELETE"
        }, 8);
    });

    // Loop through router and register commands that aren't registered yet
    routes.forEach(async (route: CommandRoute) => {

        // Ignore private routes
        if (route.private) return;

        // Get registered command
        let registeredCommand = registeredCommands.find((command: any) => command.name === route.name);

        // Register command
        if (
            !registeredCommand ||
            route.information !== registeredCommand.description ||
            JSON.stringify(route.parameters) !== JSON.stringify(registeredCommand.options)
        ) registeredCommand = await client.fetchQueues.registerSlashCommand.request(ENDPOINT, {
            method: "POST",
            body: {
                name: route.name,
                description: route.information,
                options: route.parameters
            }
        }, 8);

        // Set command id
        route.id = registeredCommand.id;
    });
}