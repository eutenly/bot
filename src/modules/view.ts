import Command from "../classes/Command/Command";
import Message from "../classes/Message/Message";

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
    command.view(data, message, command);
}