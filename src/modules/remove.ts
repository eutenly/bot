import Command, { ParserData, ViewData } from "../classes/Command/Command";
import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";
import save from "../models/save";
import { SavedLink } from "../models/users";

export default async function remove(message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Get command
    const command: Command | undefined = message.author.command;
    if ((!command) || (command.name !== "savedLinks")) return message.channel.sendMessage(":x:  **|  You aren't viewing your saved links**");

    // Get user data
    const userData = await message.author.getData();
    if ((!userData) || (userData.savedLinks.length === 0)) return message.channel.sendMessage(`:x:  **|  You don't have any saved links. You can save a link with \`${prefix}save <Link>\`. You can also save what you're currently viewing with \`${prefix}save\`**`);

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which saved link would you like to remove?**");

    // Get data
    const data: SavedLink[] = command.searchManager?.cache.get(command.searchManager.page || 0);

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Get result
    if (!data[resultNumber - 1]) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Remove saved link
    userData.savedLinks.splice(resultNumber - 1, 1);

    // Run parser
    if (!command.parser) return;
    const parserData: ParserData = command.parser(userData.savedLinks);

    // If theres no data, set it to an empty array
    if (parserData.noData) parserData.data = [];

    // Split data into pages
    command.searchManager?.cache.clear();
    if (command.searchManager?.splitPages) for (let i = 0; i < Math.ceil(parserData.data.length / command.searchManager?.splitPages); i++) {

        // Add to cache
        command.searchManager?.cache.set(i + 1, parserData.data.slice(i * command.searchManager?.splitPages, (i * command.searchManager?.splitPages) + command.searchManager?.splitPages));
    }

    // Get embed
    const embed: Embed = command.getEmbed(command, command.searchManager?.cache.get(command.searchManager.page || 0) || []);

    // Send
    command.send(embed);

    // Save
    await save(userData);

    // Send
    message.channel.sendMessage(":white_check_mark:  **|  Removed link!**");
}