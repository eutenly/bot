import { GuildPermissions } from "../classes/Guild/getPermissions";
import UserRequest from "../classes/UserRequest/UserRequest";

export default async function setPrefix(userRequest: UserRequest) {

    // Ignore dms
    if (!userRequest.guild) return;

    // Get params
    const prefix: string | undefined = userRequest.getParameter<string>("prefix");

    // Invalid input
    if ((prefix) && (prefix.length > 10)) return userRequest.respond(":x:  **|  The prefix can't be more than 10 characters**");

    // Missing manage server perms
    const permissions: GuildPermissions = await userRequest.guild.getPermissions({ userID: userRequest.user.id });
    if ((permissions.permissions & 0x20) !== 0x20) return userRequest.respond(":x:  **|  You need the Manage Server or Administrator permission to be able to do that**");

    // Set prefix
    userRequest.guild.setPrefix((prefix || process.env.DEFAULT_PREFIX) as string);

    // Send
    userRequest.respond(`:white_check_mark:  **|  The prefix is now ${prefix || process.env.DEFAULT_PREFIX}**`);
}