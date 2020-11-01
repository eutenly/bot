import Command, { ViewData } from "../classes/Command/Command";
import Message from "../classes/Message/Message";
import collectStat from "../util/collectStat";

export default async function view(message: Message) {

    // Get command
    const command: Command | undefined = message.author.command;
    if (!command) return message.channel.sendMessage(":x:  **|  You haven't searched anything recently**");

    // Nothing to view
    if (!command.view) return message.channel.sendMessage(":x:  **|  There's nothing to view**");

    // Get data
    let data: any;
    if (command.data) data = command.data;
    else data = command.searchManager?.cache.get(command.searchManager.page || 0);

    // Run module
    const viewData: ViewData | undefined = command.view(data, message, command);
    if (!viewData) return;

    if (viewData.error) message.channel.sendMessage(viewData.error);
    else if (viewData.module) {

        // Run module
        const resultCommand: Command = await viewData.module();
        if (!resultCommand) return;

        // Collect stats
        collectStat(message.client, {
            measurement: "results_viewed",
            tags: {
                dms: message.guild ? undefined : true
            },
            fields: {
                command: command.name,
                commandType: command.type,
                resultCommand: resultCommand.name,
                resultCommandType: resultCommand.type
            }
        });
    }
}