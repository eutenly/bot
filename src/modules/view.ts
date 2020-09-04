import Command from "../classes/Command/Command";
import { CachedResult } from "../classes/Command/SearchManager/SearchManager";
import Message from "../classes/Message/Message";

export default async function view(message: Message) {

    // Get command
    const command: Command | undefined = message.author.command;
    if (!command) return message.channel.sendMessage(":x:  **|  You haven't searched anything recently**");

    // Run module
    const cachedResult: CachedResult | undefined = command.searchManager.cache.get(command.searchManager.page || 0);
    if (cachedResult) command.view(cachedResult, message);
}