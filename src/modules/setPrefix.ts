import { GuildPermissions } from "../classes/Guild/getPermissions";
import Message from "../classes/Message/Message";

export default async function setPrefix(message: Message) {

    // Ignore dms
    if (!message.guild) return;

    // Get params
    const prefix: string = message.commandContent.split(" ").slice(1).join(" ");

    // Invalid input
    if (prefix.length > 10) return message.channel.sendMessage(":x:  **|  The prefix can't be more than 10 characters**");

    // Missing manage server perms
    const permissions: GuildPermissions = await message.guild.getPermissions({ userID: message.author.id });
    if ((permissions.permissions & 0x20) !== 0x20) return message.channel.sendMessage(":x:  **|  You need the Manage Server or Administrator permission to be able to do that**");

    // Set prefix
    message.guild.setPrefix((prefix || process.env.DEFAULT_PREFIX) as string);

    // Send
    message.channel.sendMessage(`:white_check_mark:  **|  The prefix is now ${prefix || process.env.DEFAULT_PREFIX}**`);
}