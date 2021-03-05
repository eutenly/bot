import Command, { ViewData } from "../classes/Command/Command";
import UserRequest from "../classes/UserRequest/UserRequest";
import collectStat from "../util/collectStat";

export default async function view(userRequest: UserRequest) {

    // Get command
    const command: Command | undefined = userRequest.user.command;
    if (!command) return userRequest.respond(":x:  **|  You haven't searched anything recently**");

    // Nothing to view
    if (!command.view) return userRequest.respond(":x:  **|  There's nothing to view**");

    // Get data
    let data: any;
    if (command.data) data = command.data;
    else data = command.pageManager?.cache.get(command.pageManager.page || 0);

    // Run module
    const viewData: ViewData | undefined = command.view(data, userRequest, command);
    if (!viewData) return;

    if (viewData.error) {
        command.debug("Created error while viewing", {
            input: userRequest.getParameter<string>("result"),
            error: viewData.error
        });
        userRequest.respond(viewData.error);
    }
    else if (viewData.module) {

        // Run module
        const resultCommand: Command = await viewData.module();
        if (!resultCommand) return;

        // Debug
        command.debug("Viewed item", {
            input: userRequest.getParameter<string>("result"),
            resultCommand: resultCommand.name,
            resultCommandType: resultCommand.category
        });
    }
}