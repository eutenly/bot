import Guild, { GuildDataChannel, GuildDataRole } from "./Guild";

export interface PartialPermissionsGuildData {
    channels?: GuildDataChannel[];
    rawRoles?: GuildDataRole[];
    myRoles?: string[];
}

export interface Permissions {
    [key: string]: number;
}

export default async function calculateBotPermissions(guild: Guild, rawData: PartialPermissionsGuildData = {}) {

    // If it's already processing bot permissions, set `processBotPermissions` to true
    // This will cause it to calculate bot permissions again once it's done, in case there was another update to the perms
    if (guild.processingBotPermissions) {

        // Set process bot permissions
        guild.processBotPermissions = true;

        return;
    }

    // Set processing bot permissions
    guild.processingBotPermissions = true;

    // Get permissions
    guild.permissions = (await guild.getPermissions({
        channels: rawData.channels,
        roles: rawData.rawRoles,
        userID: guild.client.id,
        memberRoles: rawData.myRoles
    })).channels;

    // Set processing bot permissions
    guild.processingBotPermissions = false;

    // If `processBotPermissions` is true, calculate bot permissions again
    if (guild.processBotPermissions) {

        // Set process bot permissions
        guild.processBotPermissions = false;

        // Calculate bot permissions
        calculateBotPermissions(guild);
    }
}