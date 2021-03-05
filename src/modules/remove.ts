import Command, { ParserData } from "../classes/Command/Command";
import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";
import UserRequest from "../classes/UserRequest/UserRequest";
import save from "../models/save";
import { SavedLink } from "../models/users";
import collectStat from "../util/collectStat";

export default async function remove(userRequest: UserRequest) {

    // Get command
    const command: Command | undefined = userRequest.user.command;
    if ((!command) || (command.category !== "savedLinks")) return userRequest.respond(":x:  **|  You aren't viewing your saved links**");

    // Get user data
    const userData = await userRequest.user.getData();
    if ((!userData) || (userData.savedLinks.length === 0)) return userRequest.respond(`:x:  **|  You don't have any saved links. You can save a link with \`${userRequest.channel.prefix}save <Link>\`. You can also save what you're currently viewing with \`${userRequest.channel.prefix}save\`**`);

    // Get params
    const resultNumber: number | undefined = userRequest.getParameter<number>("link-number");
    if (!resultNumber) return userRequest.respond(":x:  **|  Which saved link would you like to remove?**");

    // Get data
    const data: SavedLink[] = command.pageManager?.cache.get(command.pageManager.page || 0);

    // Get result
    if (!data[resultNumber - 1]) return userRequest.respond(":x:  **|  That result number is invalid**");

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
    collectStat(userRequest.client, {
        type: "userInitiatedGuildEvent",
        userID: userRequest.user.id,
        guildID: userRequest.guild?.id,
        eventTrigger: userRequest.source instanceof Message ? "textCommand" : "slashCommand",
        eventService: "savedLinks",
        eventAction: "remove"
    });

    // Send
    userRequest.respond(":white_check_mark:  **|  Removed link!**");
}