import Command, { ParserData } from "../classes/Command/Command";
import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";
import save from "../models/save";
import { SavedLink } from "../models/users";
import collectStat from "../util/collectStat";

export default async function remove(message: Message) {

    // Get command
    const command: Command | undefined = message.author.command;
    if ((!command) || (command.category !== "savedLinks")) return message.channel.sendMessage(":x:  **|  You aren't viewing your saved links**");

    // Get user data
    const userData = await message.author.getData();
    if ((!userData) || (userData.savedLinks.length === 0)) return message.channel.sendMessage(`:x:  **|  You don't have any saved links. You can save a link with \`${message.channel.prefix}save <Link>\`. You can also save what you're currently viewing with \`${message.channel.prefix}save\`**`);

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which saved link would you like to remove?**");

    // Get data
    const data: SavedLink[] = command.pageManager?.cache.get(command.pageManager.page || 0);

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Get result
    if (!data[resultNumber - 1]) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Remove saved link
    userData.savedLinks.splice(resultNumber - 1, 1);

    // Run parser
    if (!command.parser) return;
    const parserData: ParserData | undefined = command.parser(userData.savedLinks, [], command.metadata);

    // Cache data
    if (parserData) {
        command.pageManager?.cache.clear();
        command.pageManager?.cacheData(1, parserData.data);
    }

    // Get embed
    const embed: Embed = command.getEmbed(command, command.pageManager?.cache.get(command.pageManager.page || 0) || []);

    // Send
    command.send(embed);

    // Save
    await save(userData);

    // Collect stats
    collectStat(message.client, {
        measurement: "saved_links_updated",
        tags: {
            action: "remove",
            dms: message.guild ? undefined : true
        }
    });

    // Send
    message.channel.sendMessage(":white_check_mark:  **|  Removed link!**");
}